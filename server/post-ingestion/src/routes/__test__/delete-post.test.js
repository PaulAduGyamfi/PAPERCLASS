const request = require('supertest')
const app = require('../../app')
const { fakeAuth } = require('./test-authenticator')
const Post = require('../../models/Post')
const mongoose = require('mongoose')

const id1 = new mongoose.Types.ObjectId().toHexString()
const id2 = new mongoose.Types.ObjectId().toHexString()
const id3 = new mongoose.Types.ObjectId().toHexString()
const id4 = new mongoose.Types.ObjectId().toHexString()


it('should soft delete post if it has comments', async () => {
      const post = await new Post({
        author: "two10p",
        author_id: "231942342342",
        text: 'This is an original post',
        post_id: 'uhe293e32hb2hy2233',
        _id: id1
      })

      await post.save()

      const comment = await request(app)
        .post('/c/post/comment')
        .set('Cookie', fakeAuth())
        .send({
          author: "two10p",
          author_id: "231942342342",
          text: 'This is an original post',
          origin_id: post._id,
        })


      const deletePost = await request(app)
        .delete('/c/post/delete')
        .set('Cookie', fakeAuth())
        .send({
          id: id1,
          user_id: post.author_id
        })
        .expect(200)

    
        expect(deletePost.body.text).toEqual('[ deleted ]')
        expect(deletePost.body.author).toEqual('[ deleted ]')
        expect(deletePost.body.author_id).toEqual('[ deleted ]')
        expect(deletePost.body.deleted_on).not.toEqual(null)
        expect(deletePost.body._id).toEqual(comment.body.origin_id)
        expect(deletePost.body.comments[0]).toEqual(comment.body._id)
})

it('should hard delete comment from parent post if it has no replies', async () => {
      const post = await new Post({
        author: "two10p",
        author_id: "231942342342",
        text: 'This is an original post',
        post_id: 'uhe293e32hb2hy2233',
        _id: id2
      })
      
      await post.save()

      const comment = await request(app)
        .post('/c/post/comment')
        .set('Cookie', fakeAuth())
        .send({
          author: "two10p",
          author_id: "231942342342",
          text: 'This is an original post',
          origin_id: post._id,
        })
        

        const deletePost = await request(app)
        .delete('/c/post/delete')
        .set('Cookie', fakeAuth())
        .send({
          id: comment.body._id,
          user_id: post.author_id
        })
        .expect(200)

        expect(deletePost.body.deletedCount).toEqual(1)
        expect(post.comment_count).toEqual(0)
        expect(post.comments.length).toEqual(0)


})

it('should hard delete post from db if it has no comments', async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
    _id: id3
  })
  
  await post.save()
    

    const deletePost = await request(app)
    .delete('/c/post/delete')
    .set('Cookie', fakeAuth())
    .send({
      id: id3,
      user_id: post.author_id
    })
    .expect(200)

    const findPost = await Post.findOne({_id: id3})

    expect(deletePost.body.deletedCount).toEqual(1)
    expect(findPost).toEqual(null)
})

it('should remove post from parent quoted list if it is a quoted post', async () => {
  const post = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    post_id: 'uhe293e32hb2hy2233',
    _id: id4
  })

  await post.save()

  const quotePost = await new Post({
    author: "two10p",
    author_id: "231942342342",
    text: 'This is an original post',
    is_quote: true,
    quote_origin_id: id4,
    post_id: 'uhe293e32hb2hy2233',
})

await quotePost.save()



  const deletePost = await request(app)
    .delete('/c/post/delete')
    .set('Cookie', fakeAuth())
    .send({
      id: quotePost._id,
      user_id: quotePost.author_id
    })
    .expect(200)

    expect(deletePost.body.deletedCount).toEqual(1)
    expect(post.quoted_this_post.includes(quotePost._id)).toEqual(false)
    expect(post.share_count).toEqual(0)
})