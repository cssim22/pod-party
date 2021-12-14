/* ************* START QUERIES HERE ************ */

---------------ADDED TO USER CONTROLLER---------------------------
--CREATE A NEW USER
INSERT INTO users (username, email, first_name, last_name, nickname, created_at)
VALUES ($1, $2, $3, $4, $5, $6);

---------------ADDED TO VOTE CONTROLLER---------------------------
--CAST A VOTE (UPVOTE)
INSERT INTO votes (podcast_id, user_id, vote_type)
VALUES ($1, $2, "upvote");

--CAST A VOTE (DOWNVOTE)
INSERT INTO votes (podcast_id, user_id, vote_type)
VALUES ($1, $2, "downvote");

--REMOVE A VOTE (UNDO VOTE)
--how 'overwrite' existing vote, WHERE vote_id = $3
INSERT INTO votes (podcast_id, user_id, vote_type)
VALUES ($1, $2, "null");

---------------ADDED TO COMMENT CONTROLLER---------------------------
--ADD A COMMENT
INSERT INTO comments (comment, group_id, user_id, created_at)
VALUES ($1, $2, $3, $4);

--DELETE A COMMENT (passing in comment_id)
DELETE FROM comments
WHERE comment_id = $1;

---------------ADDED TO GROUP CONTROLLER---------------------------
--CREATE A GROUP
INSERT INTO groups (group_name, created_at)
VALUES ($1, $2);

--DELETE A GROUP (passing in group_id)
DELETE FROM groups
WHERE group_id = $1;

--ADD A USER TO A GROUP
INSERT INTO users_groups (user_id, group_id, created_at)
VALUES ($1, $2, $3);

--REMOVE A USER FROM A GROUP (passing in user_id and group_id)
DELETE FROM users_groups
WHERE user_id = $1
AND group_id = $2;

---------------ADDED TO PODCAST CONTROLLER---------------------------
--CREATE A NEW PODCAST IN DATABASE
INSERT INTO podcasts (podcast_name, author, group_id, created_at)
VALUES ($1, $2, $3, $4);

--DELETE A PODCAST IN DATABASE
DELETE FROM podcasts
WHERE podcast_name = $1;