insert into users ( 
  username,
  role_id, 
  auth0_id
) values (
  ${email},
  ${roleId},
  ${auth0Id}
);

select * from users where auth0_id = ${auth0Id};