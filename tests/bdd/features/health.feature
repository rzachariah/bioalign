Feature: API Health Check

    Scenario: Running api is healthy
        Given the api is running
        When I make a GET request to "/api/v1/health"
        Then the statusCode is 200