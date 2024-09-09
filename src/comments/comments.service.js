const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*");
}

function listCommenterCount() {
  // join between comments and users tables here to get the needed columns.
  //a count of comments from each commenter, grouped by user_email, aliased to commenter_email, ordered by commenter_email in your result
   return knex("comments as co")
    .join("users as us", "co.commenter_id", "us.user_id")
    .count("co.comment")
    .groupBy("us.user_email")
    .select("us.user_email as commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  // comment_id, comment, user_email aliased as commenter_email, and post_body aliased as commented_post
  //join between the comments, users, and posts tables here
  
   return knex("comments as co")
    .join("users as us", "co.commenter_id", "us.user_id")
    .join("posts as p", "p.post_id", "co.post_id")
    .select("co.comment_id", "co.comment", "us.user_email as commenter_email", "p.post_body as commented_post")
    .where({ "co.comment_id": commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
