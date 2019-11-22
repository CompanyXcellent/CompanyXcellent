insert into users ( auth0_id, username ) 
values ( $1, $2 );

select * from users where auth0_id = $1;