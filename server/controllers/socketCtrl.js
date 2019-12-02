module.exports = {
    getRooms: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const rooms = await db.get_rooms(id)
        res.status(200).send(rooms)
    },
    getRoom: async (app, chat_room_id) => {
        const db = app.get('db');

        let room = await db.get_room(chat_room_id);
        room = room[0];

        if (room) {
            return room;
        } else {
            return false;
        }
    },
    createRoom: async (app, userOne, userTwo) => {
        const db = app.get('db');

        let chatRoomName = randomatic('Aa0!', 20);

        let room = db.get_room_by_name(chatRoomName);

        if (room) {
            // Do while room still truthy, create new unique number.
        }

        let newRoom = await db.create_chat_room(chatRoomName, user_id, otherUser);
        newRoom = newRoom[0];

        return newRoom;
    },
}