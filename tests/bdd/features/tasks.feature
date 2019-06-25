Feature: Get task status

    Scenario: Get unknown task yields 404
        Given the api is running
        When I make a GET request to "/api/v1/tasks/unknown"
        Then the statusCode is 404