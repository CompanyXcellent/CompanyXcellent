module.exports = {
    getAllEmployees: async (req, res) => {
        const db = req.app.get('db')
        const allEmps = await db.get_employees()
        res.status(200).send(allEmps)
    },
    makePoll: async (req, res) => {
        const db = req.app.get('db')
        const {q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15} = req.body
        await db.make_new_poll(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15)
        res.sendStatus(200)
    },
    getEmployee: async (req, res) => {
        const db = req.app.get('db');
        const { userId } = req.params;
        let employee = await db.get_employee_by_user_id(userId);
        employee = employee[0];

        res.status(200).send(employee);
    },

}