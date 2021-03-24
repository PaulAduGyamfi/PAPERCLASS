const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')

it('should have status 302 to redirect user if not logged in', async () => {
  
})

it("should should push users downvote if the user hasn't voted", async () => {
  
})

it('should remove upvote and add downvote to post if user previously upvoted', async () => {
  
})

it('should remove downvote if user previously downvoted', async () => {
  
})