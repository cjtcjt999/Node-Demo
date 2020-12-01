const { router, pool, Result } = require('../connect');

router.get('/a',(req,res) => {
  pool.getConnection((err,conn) => {
    conn.query('SELECT * FROM students', (error, result) => {
      if (error) {
        throw error;
      }
      return res.json(new Result({ data: result }))
    });
    conn.release();
  })
})
router.get('/b', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('SELECT * FROM students WHERE name = "褚锦涛" AND sex = "男"', (error, result) => {
      if (error) {
        throw error;
      }
      return res.json(new Result({ data: result }))
    });
    conn.release();
  })
})
module.exports = router;