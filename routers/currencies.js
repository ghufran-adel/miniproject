const currencyRouter = require('express').Router()

/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
    {
      id: 1,
      currencyCode: "CDN",
      country: "Canada",
      conversionRate: 1
    },
    {
      id: 2,
      currencyCode: "USD",
      country: "United States of America",
      conversionRate: 0.75
    }
  ]
  
  /**
   * TESTING Endpoint (Completed)
   * @receives a get request to the URL: http://localhost:3001/
   * @responds with the string 'Hello World!'
   */
  currencyRouter.get('/hello', (request, response) => {
    response.send('Hello World!')
  })
  


/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
currencyRouter.get('/', (request, response) => {
    response.json(currencies)
  })
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */
  currencyRouter.get('/:id', (request, response) => {
    const Id = parseInt(request.params.id)
    try{
      const currency = currencies.find(currency => currency.id === Id)
      if (!currency){
        return response.status(404).json({ error: 'Resource not found' })
      }
      response.json(currency)
    }
    catch(error){
      response.send(error.message)
    }
    
     
  });
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  currencyRouter.post('/', (request, response) => {
  const newCurrency=request.body
  try{
    const addedCurrency=currencies.concat(newCurrency)
    if (!newCurrency || !newCurrency.currencyCode || !newCurrency.country || !newCurrency.conversionRate) {
      return response.status(400).json({ error: 'Content missing. Please provide all required fields.' });
    }
    response.json(addedCurrency)
  }
  
  catch(error){
    response.send(error.message)
  }
  
  })
  
  /**
   * TODO: PUT:id endpoint
   * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
   * with data object enclosed
   * Hint: updates the currency with the new conversion rate
   * @responds by returning the newly updated resource
   */
  currencyRouter.put('/:id/:newRate', (request, response) => {
    const newConversionRate = parseFloat(request.params.newRate)
    let CopyCurrencies=[...currencies]
    const modifiedCurrency = CopyCurrencies.map(currency => {
      if (currency.id === parseInt(request.params.id)) {
        return { ...currency, conversionRate: newConversionRate }
      }
      return currency
    });
    response.json(modifiedCurrency )
    
  })
  
  /**
   * TODO: DELETE:id Endpoint
   * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
   * @responds by returning a status code of 204
   */
  currencyRouter.delete('/:id', (request, response) => {
    const Id = parseInt(request.params.id)
    let copyCurrencies = [...currencies]
    const newCurrencies = copyCurrencies.filter(currency => currency.id !== Id)
  
    response.sendStatus(204);
  })
  

  module.exports =currencyRouter

