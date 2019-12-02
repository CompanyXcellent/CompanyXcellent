select *
from messages
where room_id = $1
order by message_id