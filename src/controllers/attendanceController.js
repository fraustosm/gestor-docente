const pool = require('../config/database');

const registerAttendance = async (req, res) => {

    try {

        const { studentId } = req.params;
        const { status } = req.body;

        const result = await pool.query(
            `
            INSERT INTO attendance (
                student_id,
                attendance_date,
                status
            )
            VALUES (
                $1,
                CURRENT_DATE,
                $2
            )
            RETURNING *
            `,
            [studentId, status]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const getAttendanceByStudent = async (req, res) => {

    try {

        const { studentId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM attendance
            WHERE student_id = $1
            ORDER BY attendance_date DESC
            `,
            [studentId]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const attendanceReport = async (req, res) => {

    try {

        const { studentId } = req.params;

        const result = await pool.query(
            `
            SELECT
                COUNT(*) AS total,
                SUM(
                    CASE
                        WHEN status = 'Present'
                        THEN 1
                        ELSE 0
                    END
                ) AS presents
            FROM attendance
            WHERE student_id = $1
            `,
            [studentId]
        );

        const total = Number(result.rows[0].total);

        const presents =
            Number(result.rows[0].presents) || 0;

        const percentage =
            total === 0
                ? 0
                : Number(
                    ((presents / total) * 100)
                        .toFixed(2)
                );

        res.json({
            total,
            presents,
            percentage
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

module.exports = {
    registerAttendance,
    getAttendanceByStudent,
    attendanceReport
};