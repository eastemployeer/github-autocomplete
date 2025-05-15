import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
  
Given("I visit the autocomplete page", () => {
  cy.visit("/");
});

When("I type {string} into the search input", (text: string) => {
  cy.get('[data-testid="search-input"]').clear().type(text);
});

Then("I should see list of search results", () => {
  cy.get('[data-testid="search-results-list"]').should("be.visible");
});

Then("I should see a message indicating that minimal required characters is not reached - {string}", (message: string) => {
  cy.get('[data-testid="search-disabled-box"]').contains(message).should("be.visible");
});

Then("I should see a message indicating that there are no results - {string}", (message: string) => {
  cy.get('[data-testid="search-results-empty"]').contains(message).should("be.visible");
});

When("I press the down arrow key", () => {
  cy.get('[data-testid="github-autocomplete"]').type("{downarrow}");
});

When("I press Enter", () => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });
  cy.get('[data-testid="github-autocomplete"]').type("{enter}");
});

Then("I should be taken to the website related with active search result item", () => {
  cy.get('[data-testid="search-results-item"][data-test-active="true"]')
        .get('a')
        .invoke('attr', 'href')
        .then((expectedHref) => {
          cy.get('@windowOpen').should('have.been.calledWith', expectedHref);
        });
});

Then("the second search result item should be active", () => {
  cy.get('[data-testid="search-results-list"]').children().eq(1).should('have.attr', 'data-test-active', 'true');
});

Then("the input should contain {string}", (value) => {
  cy.get('[data-testid="search-input"]').should("have.value", value);
});

When("I click the clear button", () => {
  cy.get('[data-testid="search-clear-button"]').click();
});

Then("the input should be empty", () => {
  cy.get('[data-testid="search-input"]').should("have.value", "");
});

Then("the input should be focused", () => {
  cy.get('[data-testid="search-input"]').should("be.focused");
});
