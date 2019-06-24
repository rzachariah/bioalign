class Configuration {
    constructor() {
        this.routingPath = '/api/v1';
        this.port = process.env.PORT || 4000;
        this.sqsQueue = process.env.SQS_QUEUE || 'https://sqs.us-east-1.amazonaws.com/848798434565/test-queue'
    }
}

module.exports = new Configuration();