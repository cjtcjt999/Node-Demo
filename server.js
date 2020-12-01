const { app, pool, Result } = require('./connect');
const login = require('./login/index');

app.all('*',(req,res,next) => {
  //这里处理全局拦截，一定要写在最上面，不然会被别的接口匹配而没有执行next导致捕捉不到
  next();
})
app.get('/', (req, res) => {
  pool.getConnection((err, conn) => {
    conn.query('SELECT * FROM students', (error, result) => {
      if (error) {
        throw error;
      }
      return res.json(new Result({ data: result }))
    });
    conn.release();
  })
})
app.get('/list', (req, res) => {
  pool.query('SELECT * FROM students',(error,result) => {
    if (error) {
      throw error;
    }
    return res.json(new Result({data:result}))
  });
})
app.use('/login',login);
//定义端口，此处所用为3000端口，可自行更改
var server = app.listen(3000, function () {
  console.log('runing 3000...');
})
