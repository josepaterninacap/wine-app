const realscenario = Cypress.env('realscenario')

describe('browse wines details', () => {
  it('should display wine details', () => {
    if (!realscenario) cy.intercept('*/regions', { fixture: 'wines-regions.json' })
    if (!realscenario) cy.intercept('*/wines?region=Bordeaux', { fixture: 'bordeaux-wines.json' })
    if (!realscenario) cy.intercept('*/wines?region=Loire', { fixture: 'loire-wines.json' })
    cy.visit('/')
    cy.getAPIData('regions')
      .then(regionsResult => {
        if (regionsResult.body !== undefined && regionsResult.body.length > 0) {
          let regions = regionsResult.body
          cy.get('[data-test-id=wines-regions-list-container]').children('[data-test-id=wines-region-item]').as('regions')
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
                      cy.get('@wines').contains(wine.name).click()
                      cy.url().then(wineurl => {
                        let wineidregex = /[^/]+(?=\/$|$)/g;
                        let wineid = wineurl.match(wineidregex)
                        cy.getAPIData('wines', '/' + wineid)
                          .then(detailsresult => {
                            let winedetails = detailsresult.body
                            cy.get('[data-test-id=wine-details]')
                            cy.get('[data-test-id=wine-details-image]')
                            cy.get('[data-test-id=wine-details-name]').contains(winedetails.name)
                            cy.get('[data-test-id=wine-details-appellation]').contains(winedetails.appellation.name)
                            cy.get('[data-test-id=wine-details-region]').contains(winedetails.appellation.region)
                            cy.get('[data-test-id=wine-details-type]').contains(winedetails.type)
                            cy.get('[data-test-id=wine-details-grapes]').contains(winedetails.grapes.join(', '))
                            cy.get('[data-test-id=wine-toggle-like]').should("be.visible")
                            cy.get('[data-test-id=wines-button-home').should("be.visible")
                            cy.get('[data-test-id=wines-button-back').should("be.visible").click()
                          })
                      })
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