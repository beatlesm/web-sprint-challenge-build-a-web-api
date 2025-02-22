const express = require('express');
const cors = require('cors')

const projectsRouter = require('./projects/projects-router')
const actionsRouter = require('./actions/actions-router')

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use(cors())

server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('*', (req, res) => {
    res.send(`Sprint 4.1`)
  })

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = server;
