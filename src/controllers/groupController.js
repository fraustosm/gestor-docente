const pool = require('../config/database');

const getGroups = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM groups
            WHERE user_id = $1
            ORDER BY id
            `,
            [req.user.id]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const createGroup = async (req, res) => {

    try {

        const { name } = req.body;

        const result = await pool.query(
            `
            INSERT INTO groups(name, user_id)
            VALUES($1, $2)
            RETURNING *
            `,
            [name, req.user.id]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const updateGroup = async (req, res) => {

    try {

        const { id } = req.params;
        const { name } = req.body;

        const result = await pool.query(
            `
            UPDATE groups
            SET name = $1
            WHERE id = $2
            RETURNING *
            `,
            [name, id]
        );

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const deleteGroup = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            `
            DELETE FROM groups
            WHERE id = $1
            `,
            [id]
        );

        res.json({
            message: 'Group deleted'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const getGroupById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM groups
            WHERE id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: 'Group not found'
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

module.exports = {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    getGroupById,
};