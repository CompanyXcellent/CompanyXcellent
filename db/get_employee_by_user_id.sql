select u.user_id, u.username, ui.first_name, ui.last_name, ui.profile_img, ui.about, ui.job_title, ui.nickname, g.group_name 
from users u
join user_info ui on u.user_id = ui.user_id
join groups g on ui.group_id = g.group_id
where u.user_id = $1;