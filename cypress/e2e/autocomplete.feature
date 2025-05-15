Feature: Autocomplete search

  Scenario: User types a valid search term and sees results
    Given I visit the autocomplete page
    Then I type "app" into the search input
    Then I should see list of search results

  Scenario: Input is too short
    Given I visit the autocomplete page
    When I type "a" into the search input
    Then I should see a message indicating that minimal required characters is not reached - "Minimal chars number to initialize search is 3"

  Scenario: No results found
    Given I visit the autocomplete page
    When I type "xyzzzzzdsadsazzzdsadzzzzzz" into the search input
    Then I should see a message indicating that there are no results - "No results found"

  Scenario: Navigate suggestions with keyboard
    Given I visit the autocomplete page
    When I type "app" into the search input
    Then I should see list of search results
    When I press the down arrow key
    And I press the down arrow key
    Then the second search result item should be active

  Scenario: Go to website from search result item with Enter
    Given I visit the autocomplete page
    When I type "ban" into the search input
    Then I should see list of search results
    When I press the down arrow key
    And I press Enter
    Then I should be taken to the website related with active search result item    
  
  Scenario: Clear search input with clear button
    Given I visit the autocomplete page
    When I type "something" into the search input
    Then the input should contain "something"
    When I click the clear button
    Then the input should be empty
    And the input should be focused


