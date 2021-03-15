const nats = require('node-nats-streaming')
const { PostCreatedPublisher } = require('./events/post-created-publisher')

console.clear()

const stan = nats.connect('server', 'abc', {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Publisher connected to NATS')

  const publisher = new PostCreatedPublisher(stan)
  publisher.publish({
    author: 'John Doe',
    author_id: '231923131',
    text: 'YOOOOOOO!'
  })

  // const data = JSON.stringify({
  //   id: '123',
  //   text: 'yoooo'
  // })

  // stan.publish('post:created', data, () => {
  //   console.log('Event published')
  // })
})
