Feature: Look up the entity name associated with an ABN

    If a user types in a valid ABN, and API request should be performed and the business name returned

    Scenario: User enters a valid ABN
        Given User enters a valid ABN
        Then The entity name associated with that ABN will be displayed