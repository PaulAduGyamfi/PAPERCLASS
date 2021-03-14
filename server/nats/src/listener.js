const nats = require('node-nats-streaming')
const {randomBytes} = require('crypto')

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

  const options = stan
  .subscriptionOptions()
  .setManualAckMode(true)

  const subscription = stan.subscribe(
    'post:created',
    'query-service-queue-group',
    options
    )

  subscription.on('message', (msg) => {
    const data = msg.getData()
    console.log(`Received event #${msg.getSequence()}, with data: ${data}`)

    msg.ack()
  })
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())