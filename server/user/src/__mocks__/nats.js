module.exports =  nats = {
  client: {
    publish: jest.fn().mockImplementation((subject, data, cb) => {
      cb()
    })
  }
}
