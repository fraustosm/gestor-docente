const pool = require('../config/database');

const getStudentsByGroup = async (req, res) => {
    try {

        const { groupId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM students
            WHERE group_id = $1
            ORDER BY id
            `,
            [groupId]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }
};

const createStudent = async (req, res) => {
    try {

        const { groupId } = req.params;

        const { name } = req.body;

        const result = await pool.query(
            `
            INSERT INTO students(name, group_id)
            VALUES($1, $2)
            RETURNING *
            `,
            [name, groupId]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }
};

const deleteStudent = async (req, res) => {
    try {

        const { id } = req.params;

        await pool.query(
            `
            DELETE FROM students
            WHERE id = $1
            `,
            [id]
        );

        res.json({
            message: 'Student deleted'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }
};

module.exports = {
    getStudentsByGroup,
    createStudent,
    deleteStudent
};