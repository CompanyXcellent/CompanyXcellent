select posts.post_id, posts.post_time, posts.content, posts.user_id, users.username from posts
join user_subscription on user_subscription.friend_user_id = posts.user_id
join users on user_subscription.friend_user_id = users.user_id
where user_subscription.user_id = $1