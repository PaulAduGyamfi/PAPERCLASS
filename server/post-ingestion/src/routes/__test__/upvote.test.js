const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')

it('should have status 302 to redirect user if not logged in', async () => {
  
})

it("should should push users upvote if they haven't voted", async () => {
  
})

it('should remove downvote and add upvote if user previously downvoted', async () => {
  
})

it('should remove upvote if user previously upvoted', async () => {
  
})