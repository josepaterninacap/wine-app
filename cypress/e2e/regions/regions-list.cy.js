const realscenario = Cypress.env('realscenario')

describe('wines regions', () => {
  it('should display a list of regions', () => {
    if (!realscenario) cy.intercept('*/regions', { fixture: 'wines-regions.json' })
    cy.visit('/')
    cy.getAPIData('regions')
      .then(result => {
        if (result.body !== undefined && result.body.length > 0) {
          let regions = result.body
          cy.get('[data-test-id=wines-regions-list-container]').children('[data-test-id=wines-region-item]').as('regions-items')
          regions.map(region => cy.get('@regions-items').contains(region))
        } else {
          cy.get('[data-test-id=wines-regions-list-container]').should("be.empty")
        }
      })
  })
})
