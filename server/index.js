const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'b3e48aac70744200a6cdb6c665d35484',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.get('/err', (req, res) =>
{
    try {
        badFunction();
    } catch (error) {
        rollbar.error('bad code');
    }
})

const port = process.env.PORT || 4005


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})