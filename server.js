const express = require('express')
const path = require('path')
const logger = require('./middlewares/logger')

const app = express()

// Logger middleware
// app.use(logger)

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// yutfresraw
app.use('/api/nameage', require('./routes/smth'))

// Paplani statik qilish
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Running:  ${PORT}`))