module.exports = {
  getRooms: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const rooms = await db.get_rooms(id);
    res.status(200).send(rooms);
  },
  getRoom: async (app, chat_room_id) => {
    const db = app.get("db");
    let room = await db.get_room(chat_room_id);
    room = room[0];
    if (room) {
      return room;
    } else {
      return false;
    }
  },
  createRoom: async (app, userOne, userTwo) => {
    const db = app.get("db");
    let chatRoomName = randomatic("Aa0!", 20);
    let room = db.get_room_by_name(chatRoomName);
    if (room) {
      // Do while room still truthy, create new unique number.
    }
    let newRoom = await db.create_chat_room(chatRoomName, user_id, otherUser);
    newRoom = newRoom[0];
    return newRoom;
  },
  getConversations: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log("hit id");
    let conversations = await db.get_conversations(id);
    let other_users_id = [];
    // const newConversations = await conversations.map(async e => {
    //   console.log(e.chat_room_id);
    //   let other_user = await db.get_names(e.chat_room_id, e.user_id);
    //   other_user = other_user[0];
    //   console.log(other_user);
    //   e.other_user = other_user;
    //   console.log(e)
    // return e;
    // });
    for (let i = 0; i < conversations.length; i++) {
      let other_user = await db.get_names(conversations[i].chat_room_id, conversations[i].user_id);
      other_user = other_user[0];
      console.log(other_user);
      conversations[i].other_user = other_user;
      //   console.log(e)
      // return e;
    }
    // console.log(newConversations)
    res.status(200).send(conversations);
  }
}
