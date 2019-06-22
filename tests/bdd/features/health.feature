Feature: API Health Check

    Scenario: Running api is healthy
        Given the api is running
        When I make a health check request
        Then the response is healthy