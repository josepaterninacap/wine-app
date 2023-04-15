const realscenario = Cypress.env('realscenario')

describe('wines from the region', () => {
  it('should display a list of wines from the region', () => {
    if (!realscenario) cy.intercept('*/regions', { fixture: 'wines-regions.json' })
    if (!realscenario) cy.intercept('*/wines?region=Bordeaux', { fixture: 'bordeaux-wines.json' })
    if (!realscenario) cy.intercept('*/wines?region=Loire', { fixture: 'loire-wines.json' })
    cy.visit('/')
    cy.getAPIData('regions')
      .then(result => {
        if (result.body !== undefined && result.body.length > 0) {
          let regions = result.body
          cy.get('[data-test-id=wines-regions-list-container]').children('[data-test-id=wines-region-item]').as('regions')
          regions.map(region => {
            cy.get('@regions').contains(region).click()
            cy.get('[data-test-id=wines-list-container]').should("be.visible")
            cy.getAPIData('wines', '?region=' + region)
              .then(winesResult => {
                if (winesResult.body != undefined) {
                  let wines = winesResult.body
                  if (wines.length > 0) {
                    cy.get('[data-test-id=wines-list-container]').children('[data-test-id=wines-list-item]').as("wines")
                    cy.get('@wines').should("have.length", wines.length)
                  }
                } else {
                  cy.get('[data-test-id=wines-list-container]').should("be.empty")
                }
              })
            cy.get('[data-test-id=wines-button-home').should("be.visible")
            cy.get('[data-test-id=wines-button-back').should("be.visible").click()
          })
        } else {
          cy.get('[data-test-id=wines-regions-list-container]').should("be.empty")
        }
      })
  })
})
