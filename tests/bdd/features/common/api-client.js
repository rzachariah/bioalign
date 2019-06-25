const rp = require('request-promise');

class ApiClient {
    constructor() {
        this._apiUrl = process.env.API_URL || 'http://localhost:4000';
        this._request;
    }

    get request() {
        return this._request;
    }

    set request(body) {
        this._request = body;
    }

    async get(resourcePath) {
        const options = {
            uri: this._apiUrl + resourcePath,
            resolveWithFullResponse: true,
            json: true // Automatically parses the JSON string in the response
        };
        return this._requestNoThrow(options);
    }

    async put(resourcePath) {
        const options = {
            method: 'PUT',
            uri: this._apiUrl + resourcePath,
            body: this.request,
            resolveWithFullResponse: true,
            json: true // Automatically parses the JSON string in the response
        };
        return this._requestNoThrow(options);
    }

    async post(resourcePath, activityId) {
        const options = {
            method: 'POST',
            uri: this._apiUrl + resourcePath,
            body: this.request,
            resolveWithFullResponse: true,
            json: true // Automatically parses the JSON string in the response
        };
        return this._requestNoThrow(options);
    }

    async delete(resourcePath, activityId) {
        const options = {
            method: 'DELETE',
            uri: this._apiUrl + resourcePath,
            resolveWithFullResponse: true,
            json: true // Automatically parses the JSON string in the response
        };
        return this._requestNoThrow(options);
    }

    async _requestNoThrow(options) {
        try {
            return await rp(options);
        } catch (error) {
            return error;
        }        
    }
}

module.exports = ApiClient;