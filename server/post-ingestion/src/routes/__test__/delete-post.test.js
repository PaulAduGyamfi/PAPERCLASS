const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')

it('should return a 404 if post does not belong to user', async () => {
  
})

it('should soft delete post if it has comments', async () => {
  
})

it('should hard delete comment from parent post if it has no replies', async () => {
  
})

it('should hard delete post from db if it has no comments', async () => {
  
})