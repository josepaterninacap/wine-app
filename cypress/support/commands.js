import Bordeaux from '../fixtures/bordeaux-wines.json'
import Loire from '../fixtures/loire-wines.json'
import comments from '../fixtures/wines-comments.json'
import likes from '../fixtures/wines-likes.json'
import regions from '../fixtures/wines-regions.json'

const realscenario = Cypress.env('realscenario')
const apiUrl = Cypress.config('apiUrl')
const response = {
  "headers": {
    "x-powered-by": "Express",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "Origin, X-Requested-With, Content-Type, Accept",
    "content-type": "application/json; charset=utf-8",
    "content-length": "195",
    "etag": "W/\"c3-ezS2tJ2hUZDxymp6aiscXQ\"",
    "connection": "keep-alive",
    "keep-alive": "timeout=5"
  },
  "status": 200,
  "statusText": "OK",
  "isOkStatusCode": true,
  "duration": 4,
}

/**
 * @method getAPIData works intecepting the API
 * 
 * Using the value of the variable realscenario set 
 * in Cypress.env('realscenario') to return the real 
 * or fixture data 
 * 
 * @param resourcePath is the url api resource path
 * @param params is the url api query parameters
 * @return the response body attached with the fixtures data
 */

Cypress.Commands.add('getAPIData', (resourcePath, params = '') => {

  if (!realscenario) {
    /* === SIMULATED SCENARIO === */
    const wines = { Bordeaux: Bordeaux, Loire: Loire }
    if (resourcePath == 'regions') {
      response['body'] = regions
      return response
    }

    if (params.includes('?region=')) {
      let region = params.split('=')[1]
      response['body'] = wines[region]
      return response
    }

    if (resourcePath = 'wines') {
      let arrayParams = params.split('/')
      let wineid = arrayParams[1]

      if (params.includes('/like')) {
        response['body'] = likes[wineid]
        return response
      }

      if (params.includes('/comments')) {
        response['body'] = comments[wineid]
        return response
      }

      return new Promise((resolve, reject) => {
        Object.keys(wines).map(region => {
          Object.values(wines[region]).map(wine => {
            if (wineid == wine.id) {
              response['body'] = wine
              resolve(response)
            }
          })
        })
      })
    }
  } else {
    /* === REAL SCENARIO === */
    let url = apiUrl + resourcePath + params
    return cy.request(url)
  }
})
