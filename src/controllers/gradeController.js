const pool = require('../config/database');

const createGrade = async (req, res) => {

    try {

        const {
            studentId,
            activityName,
            grade
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO grades(
                student_id,
                activity_name,
                grade
            )
            VALUES(
                $1,
                $2,
                $3
            )
            RETURNING *
            `,
            [
                studentId,
                activityName,
                grade
            ]
        );

        res.status(201).json(
            result.rows[0]
        );

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

const getGradesByStudent = async (req, res) => {

    try {

        const { studentId } = req.params;

        const result = await pool.query(
            `
            SELECT *
            FROM grades
            WHERE student_id = $1
            ORDER BY created_at DESC
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

const gradeReport = async (req, res) => {

    try {

        const { studentId } = req.params;

        const result = await pool.query(
            `
            SELECT
                COUNT(*) AS activities,
                AVG(grade) AS average
            FROM grades
            WHERE student_id = $1
            `,
            [studentId]
        );

        res.json({
            activities:
                Number(
                    result.rows[0].activities
                ),
            average:
                Number(
                    Number(
                        result.rows[0].average || 0
                    ).toFixed(2)
                )
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: 'Server error'
        });

    }

};

module.exports = {
    createGrade,
    getGradesByStudent,
    gradeReport
};