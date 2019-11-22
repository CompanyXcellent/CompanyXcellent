select * from posts
join user_subscription on user_subscription.friend_user_id = posts.user_id
where user_subscription.user_id = $1