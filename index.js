const express = require('express')
const apiRoute = require('./routes')

const app = express()
const PORT = 3000

app.use(express.json())
app.use('/api/v1', apiRoute)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
