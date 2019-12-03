select cp.user_id, u.first_name, u.last_name, u.profile_img from chat_room_participants cp
join user_info u on cp.user_id = u.user_id
where cp.chat_room_id = $1 and cp.user_id <> $2;