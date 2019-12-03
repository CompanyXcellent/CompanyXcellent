insert into chat_room_participants (
  chat_room_id,
  user_id
) values 
  ($1, $2),
  ($1, $3);