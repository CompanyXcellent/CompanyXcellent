module.exports = {
    getRooms: async (req, res) => {
        const { id } = req.params
        const db = req.app.get('db')
        const rooms = await db.get_rooms(id)
        res.status(200).send(rooms)
    }
}