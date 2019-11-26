update user_info 
set profile_img = $1, about = $2, nickname = $3
where user_id = $4;