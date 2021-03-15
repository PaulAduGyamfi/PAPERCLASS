const nats = require('node-nats-streaming')
const { PostCreatedPublisher } = require('./events/post-created-publisher')

console.clear()

const stan = nats.connect('server', 'abc', {
  url: 'http://localhost:4222'
})

stan.on('connect', async () => {
  console.log('Publisher connected to NATS')

  const publisher = new PostCreatedPublisher(stan)
  try {
    await publisher.publish({
      author: 'John Doe',
      author_id: '231923131',
      text: 'YOOOOOOO!'
    })
  } catch (err) {
    console.error(err)
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   text: 'yoooo'
  // })

  // stan.publish('post:created', data, () => {
  //   console.log('Event published')
  // })
})
