const request = require('supertest')
const app = require('../../app')

it('should make a GET request and return a status 200', async () => {
  return request(app)
  .get('/api/user/auth/google')
  .expect(302) //successfully redirects to redirect uri
  })
  
