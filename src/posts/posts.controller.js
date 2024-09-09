const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;
  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  // your solution here
  const newPost = ({
    post_title,
    post_body,
  } = req.body.data);
  const createdPost = await service.create(newPost);
  res.status(201).json({ data: createdPost });

}

async function update(req, res) {
   const updatedPost = {
    ...req.body.data,
    postId:  res.locals.post.postId,
  };
  
  const data = await service.update(updatedPost);
  res.json({  data: data[0]  });
}

async function destroy(req, res) {
  // your solution here

     await service.delete(res.locals.post.post_id); // Call the service to delete

     res.sendStatus(204); // Successfully deleted, return no content status
   

}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
