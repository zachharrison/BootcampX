const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
  FROM teachers
  JOIN assistance_requests ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name = $1
  ORDER BY teachers.name;
`;

const values = [process.argv[2]];

pool
.query(queryString, values)
.then(res => {
  res.rows.forEach(assistance => console.log(`${assistance.cohort}: ${assistance.teacher}`))
})
.catch((err) => {
  console.log("query error", err.stack);
});