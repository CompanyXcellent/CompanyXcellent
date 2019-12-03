insert into chat_rooms (
  chat_room_name
) values (
  $1
)
returning *;