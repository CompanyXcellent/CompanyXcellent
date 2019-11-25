select users.user_id, users.username, user_info.profile_img, user_info.about
from users
join user_info on users.user_id = user_info.user_id;
