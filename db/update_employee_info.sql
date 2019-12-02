update user_info
set first_name = ${firstName}, last_name = ${lastName}, group_id = ${team}, job_title = ${jobTitle}
where user_id = ${userId};