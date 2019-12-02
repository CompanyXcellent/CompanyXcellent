insert into rooms
    (room_name, user_1, user_2)
values
    ($1, $2, $3)

select *
from rooms
where room_name = $1