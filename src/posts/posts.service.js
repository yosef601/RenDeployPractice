const knex = require("../db/connection");

function create(post) {
  //your solution here
  return knex("posts")
    .insert(post, ["post_id", "post_title", "post_body"])
    .then((createdRecords) => createdRecords[0]);
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  //your solution here
  return knex("posts")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost,["post_id", "post_title", "post_body"]);
}

async function destroy(post_Id) {
//try {
    await knex("posts").where({ post_id: post_Id }).del();
    // No need to return anything explicitly; it should be `undefined` by default
 // } catch (error) {
   // console.error(error);
  //  throw error; // Propagate the error to be handled by the caller
//  }
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
