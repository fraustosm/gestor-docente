const pool = require('../config/database');

const studentReport = async (req, res) => {

    try {

        const { studentId } = req.params;

        const studentResult = await pool.query(
            `
            SELECT *
            FROM students
            WHERE id = $1
            `,
            [studentId]
        );

        const gradesResult = await pool.query(
            `
            SELECT
                activity_name,
                grade,
                created_at
            FROM grades
            WHERE student_id = $1
            ORDER BY created_at DESC
            `,
            [studentId]
        );

        const attendanceResult = await pool.query(
            `
            SELECT
                attendance_date,
                status
            FROM attendance
            WHERE student_id = $1
            ORDER BY attendance_date DESC
            `,
            [studentId]
        );

        const averageResult = await pool.query(
            `
            SELECT
                AVG(grade) AS average
            FROM grades
            WHERE student_id = $1
            `,
            [studentId]
        );

        const attendanceStats = await pool.query(
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

        const total =
            Number(attendanceStats.rows[0].total);

        const presents =
            Number(attendanceStats.rows[0].presents) || 0;

        const percentage =
            total === 0
                ? 0
                : Number(
                    ((presents / total) * 100)
                        .toFixed(2)
                );

        res.json({
            student: studentResult.rows[0],
            grades: gradesResult.rows,
            attendance: attendanceResult.rows,
            average:
                Number(
                    Number(
                        averageResult.rows[0].average || 0
                    ).toFixed(2)
                ),
            attendancePercentage:
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
    studentReport
};