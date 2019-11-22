module.exports = {
    getUsers: async(req, res) => {
        const db = req.app.get('db')
        let users = await db.get_users
        res.status(200).send(users)
    },

    register: async ( req, res ) => {
        const { user_id, username }
    }
}

//Derek's ass smells like onions
//I hear I don't know firsthand though