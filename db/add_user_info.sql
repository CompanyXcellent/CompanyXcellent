insert into user_info (
  user_id,
  first_name,
  last_name,
  group_id,
  job_title
) values (
  ${userId},
  ${firstName},
  ${lastName},
  ${groupId},
  ${jobTitle}
);