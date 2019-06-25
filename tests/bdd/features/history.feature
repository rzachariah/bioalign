Feature: Get completed alignments

    Scenario: Can get completed alignments
        Given the api is running
        When I make a GET request to "/api/v1/alignments"
        Then the statusCode is 200