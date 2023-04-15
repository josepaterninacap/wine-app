const realscenario = Cypress.env('realscenario')

describe('browse wines comments', () => {
  it('should add a comment to a wine', () => {
    if (!realscenario) cy.intercept('*/regions', { fixture: 'wines-regions.json' })
    if (!realscenario) cy.intercept('*/wines?region=Bordeaux', { fixture: 'bordeaux-wines.json' })
    if (!realscenario) cy.intercept('*/wines?region=Loire', { fixture: 'loire-wines.json' })
    if (!realscenario) cy.intercept('*/comments', { fixture: 'wines-comments.json' })
    cy.visit('/')
    cy.getAPIData('regions')
      .then(regionsResult => {
        if (regionsResult.body !== undefined && regionsResult.body.length > 0) {
          let regions = regionsResult.body
          cy.get('[data-test-id=wines-regions-list-container]').children('[data-test-id=wines-region-item]').as('regions')
          cy.get('@regions').should("have.length", regions.length)
          regions.map(region => {
            cy.get('@regions').contains(region).click()
            cy.getAPIData('wines', '?region=' + region)
              .then(winesResult => {
                if (winesResult.body != undefined) {
                  let wines = winesResult.body
                  if (wines.length > 0) {
                    cy.get('[data-test-id=wines-list-container]').children('[data-test-id=wines-list-item]').as("wines")
                    cy.get('@wines').should("have.length", wines.length)
                    wines.map(wine => {
                      let comment = 'Lorem ipsum ' + new Date().toLocaleString('es-ES')
                      cy.get('@wines').contains(wine.name).click()
                      cy.get('[data-test-id=wine-add-comment]').click()
                      cy.get('[data-test-id=wine-modal-comment]').should('be.visible').type(comment)
                      cy.get('[data-test-id=wine-modal-comment-button-cancel]').should('be.visible')
                      cy.get('[data-test-id=wine-modal-comment-button-submit]').should('be.visible').click()
                      cy.get('[data-test-id=wine-modal-comment]').should('not.be.visible')
                      cy.get('[data-test-id=wine-comments-list]').contains(comment)
                      cy.get('[data-test-id=wines-button-home').should("be.visible")
                      cy.get('[data-test-id=wines-button-back').should("be.visible").click()
                    })
                  }
                  else {
                    cy.get('[data-test-id=wines-list-container]').children('[data-test-id=wines-list-item]').should('not.exist')
                  }
                } else {
                  cy.get('[data-test-id=wines-list-container]').should("be.empty")
                }
                cy.get('[data-test-id=wines-button-home').click()
              })
          })
        } else {
          cy.get('[data-test-id=wines-regions-list-container]').should("be.empty")
        }
      })
  })
})