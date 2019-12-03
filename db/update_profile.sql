update user_info 
set profile_img = $1, about = $2, nickname = $3
where user_id = $4;



-- DO $$
-- BEGIN 
--   IF $1 is null and  $2 is null and $3 is null THEN
--         -- do nothing
--   END IF;
  
--   IF $1 is null and  $2 is null THEN
--         update user_info 
--         set nickname = $3
--         where user_id = $4;
--   END IF;
  
--   IF $1 is null and $3 is null THEN
--         update user_info 
--         set about = $2
--         where user_id = $4;
--   END IF;
  
--   IF $2 is null and $3 is null THEN
--         update user_info 
--         set profile_img = $1
--         where user_id = $4;
--   END IF;
  
--   IF $1 is null THEN
--         update user_info 
--         set about = $2, nickname = $3
--         where user_id = $4;
--   END IF;
  
--   IF $2 is null THEN
--         update user_info 
--         set profile_img = $1, nickname = $3
--         where user_id = $4;
--   END IF;
  
--   IF $3 is null THEN
--         update user_info 
--         set profile_img = $1, about = $2
--         where user_id = $4;
--   END IF;
-- END $$;


