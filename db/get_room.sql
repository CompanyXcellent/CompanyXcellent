select * 
from chat_room_participants 
where chat_room_id = $1 and user_id <> $2;