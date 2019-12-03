insert into user_subscription (
  user_id,
  friend_user_id
) values (
  $1,
  $2
)
returning *;