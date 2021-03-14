const nats = require('node-nats-streaming')

console.clear()

const stan = nats.connect('server', 'abc', {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Publisher connected to NATS')

  const data = JSON.stringify({
    id: '123',
    text: 'yoooo'
  })

  stan.publish('post:created', data, () => {
    console.log('Event published')
  })
})
