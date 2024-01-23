const express = require ('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const app = express() // Creates an express application in app
const morgan = require('morgan')
const currencyRouter = require('./routers/currencies')
const middleware = require('./utils/middleware')
/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())
morgan.token('res-body',middleware.morganlogger )
 app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-body'))

app.use('/api/currency', currencyRouter)  // Add currencies routes
app.use(middleware.unknownEndpoint)         //Added middleware for unknown

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})

