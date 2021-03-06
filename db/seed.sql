create table roles(
    role_id serial primary key,
    role_name varchar(100)
);

create table users(
    user_id serial primary key,
    username text,
    role_id integer references roles(role_id)
    auth0_id varchar(250)
);


create table groups(
    group_id serial primary key,
    group_name varchar(150)
);

create table user_info(
    user_info_id serial primary key,
    user_id integer references users(user_id),
    first_name varchar(100),
    last_name varchar(100),
    nickname varchar(100),
    profile_img text,
    about varchar(700),
    group_id integer references groups(group_id),
    job_title varchar(50)
);

create table poll(
    question_id serial primary key,
    question varchar(300)
);

-- create table messages(
--     message_id serial primary key,
--     post_time timestamp,
--     content varchar(1000),
--     user_id integer references users(user_id),
--     room_id integer
-- );

create table user_subscription(
    subscription_id serial primary key,
    user_id integer references users(user_id),
    friend_user_id integer references users(user_id)
);

create table response(
    response_id serial primary key,
    question_id integer,
    value integer,
    responder_id integer,
    respondee_id integer
);


create table posts(
    post_id serial primary key,
    post_time timestamp,
    content text,
    user_id integer references users(user_id)
);

create table chat_rooms (
  chat_room_id serial primary key,
  chat_room_name varchar(100)
);

create table chat_room_participants (
  chat_room_id int references chat_rooms(chat_room_id),
  user_id int references users(user_id)
);

create table messages (
  message_id serial primary key,
  sender int references users(user_id),
  chat_room_id int references chat_rooms(chat_room_id),
  message text,
  time_stamp varchar(100)
);