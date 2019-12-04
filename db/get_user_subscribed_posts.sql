select p.post_id, p.post_time, p.content, p.user_id, ui.first_name, ui.last_name, ui.profile_img
from posts p
left join user_subscription us on us.friend_user_id = p.user_id
join user_info ui on p.user_id = ui.user_id
where us.user_id = $1 or p.user_id = $1
order by p.post_id desc;
