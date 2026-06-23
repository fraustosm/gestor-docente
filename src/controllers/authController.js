const pool = require('../config/database');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
            INSERT INTO users(name, email, password)
            VALUES($1, $2, $3)
            RETURNING id, name, email
            `,
            [name, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Error creating user'
        });

    }

};

module.exports = {
    register
};