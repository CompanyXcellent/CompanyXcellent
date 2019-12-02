select * from chat_rooms cr
join chat_room_participants cp on cr.chat_room_id = cp.chat_room_id
-- join messages m on cp.chat_room_id = m.chat_room_id
where cp.user_id  = $1;
-- order by m.message_id DESC;