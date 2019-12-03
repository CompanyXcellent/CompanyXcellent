select p.post_id, p.post_time, p.content, p.user_id, u.username, ui.first_name, ui.last_name, ui.profile_img
from posts p
join user_subscription us on us.friend_user_id = p.user_id
join users u on us.friend_user_id = u.user_id
join user_info ui on u.user_id = ui.user_id
where us.user_id = $1
or p.user_id = $1;

