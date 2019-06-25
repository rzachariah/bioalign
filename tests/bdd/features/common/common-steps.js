const {
    Given,
    When,
    Then
} = require('cucumber');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs-extra');
const ApiClient = require('./api-client');

Given("the api is running", async function () {
    this.apiClient = new ApiClient();
});

Given('I set my request to the following JSON:', function (requestJSON) {
    const parsed = JSON.parse(requestJSON);
    this.request = parsed;
});

Given('I clear the {string} field', function (field) {
    delete this.request[field];
});

Given('I use {string} as {string} for my request', function (valueAsString, typeAsString) {
    this.request = getValue(valueAsString, typeAsString);
});

Given('the request {string} is set to {string} as {string}', function (fieldName, fieldValue, type) {
    this.request[fieldName] = getValue(fieldValue, type);
});

Given('I pause for {int} ms', async function (sleepMs) {
    await sleep(sleepMs);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

When('I make a GET request to {string}', async function (resourcePath) {
    this.fullResponse = await this.apiClient.get(resourcePath);
});

When('I make a PUT request to {string}', async function (resourcePath) {
    this.apiClient.request = this.request;
    this.fullResponse = await this.apiClient.put(resourcePath);
});

When('I make a POST request', async function (resourcePath) {
    this.apiClient.request = this.request;
    this.fullResponse = await this.apiClient.post(resourcePath);
});

When('I make a DELETE request to {string}', async function (resourcePath) {
    this.fullResponse = await this.apiClient.delete(resourcePath);
});

When('I make a DELETE request for {string}', async function (workflowId) {
    const resourcePath = `/api/trading/workflowstatus/v1/states/${workflowId}`;
    this.fullResponse = await this.apiClient.delete(resourcePath);
});

Then('the statusCode is {int}', function (statusCode) {
    expect(this.fullResponse.statusCode).to.equal(statusCode);
});

const getValue = function (val, type) {
    if (type === "string") {
        return val.toString();
    }
    if (type === "int") {
        return parseInt(val)
    }
    if (type === "null") {
        return null;
    }
    if (type === "empty_array") {
        return [];
    }
    if (type === "object") {
        return JSON.parse(val);
    }
}