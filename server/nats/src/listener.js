const nats = require('node-nats-streaming')
const {randomBytes} = require('crypto')
const { PostCreatedListener } = require('./events/post-created-listener')

console.clear()

const stan = nats.connect('server', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Listener connected to NATS')

  stan.on('close', () => {
    console.log('NATS connection closed!')
    process.exit()
  })

  new PostCreatedListener(stan).listen()

})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())
