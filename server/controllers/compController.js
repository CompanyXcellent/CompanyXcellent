module.exports = {
    getAllEmployees: async (req, res) => {
        const db = req.app.get('db')
        const allEmps = await db.get_employees()
        res.status(200).send(allEmps)
    }
}