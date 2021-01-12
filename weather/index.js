const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();



app.use(cors())
const userRouter = require('./routes/user')
const _linkRouter = require('./routes/link')
const indexRouter = require('./routes')
const weatherRouter = require('./routes/weather')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/v1/users',userRouter); 
app.use('/v1/links',_linkRouter);
app.use('/v1/weathers',weatherRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000 
app.listen(PORT,() => {
    console.log(`Server running .. ${PORT}`) 
})

 
