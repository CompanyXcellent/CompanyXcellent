module.exports = {
    getAllEmployees: async (req, res) => {
        const db = req.app.get('db')
        const allEmps = await db.get_employees()
        res.status(200).send(allEmps)
    },

    getEmployee: async (req, res) => {
        const db = req.app.get('db');
        const { userId } = req.params;
        let employee = await db.get_employee_by_user_id(userId);
        employee = employee[0];

        res.status(200).send(employee);
    },

}