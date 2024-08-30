const path = require('path');
const express = require('express');  //Definition
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');  //Definition
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');  //Definition
const bodyParser = require('body-parser');  //Definition
// const compression = require('compression');
const cors = require('cors');  //Definition


//Routes
const organizationsRouter = require('./routes/organizationRouter');
const clientsRouter = require('./routes/clientRouter');
const employeesRouter=require('./routes/employeeRouter')
const policyRouter=require('./routes/policyRouter');
const authenticationRouter = require('./routes/authenticationRouter');
const employeePasswordRouter = require('./routes/employeePasswordRouter');
const adminLoginRouter = require('./routes/adminloginRouter');

// Start express app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
//app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// // Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());

// Data sanitization against XSS
// app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

// app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});


app.get('/', (req, res) => {
  // i can write the code 
  res.send('Hello g welcome')
})

// 3) ROUTES
//app.use('/', viewRouter);

app.use('/api/v1/organizations', organizationsRouter);

//New Line
app.use('/api/v1/clients', clientsRouter);

//employee
app.use('/api/v1/employees', employeesRouter);

//policy
app.use('/api/v1/policies',policyRouter);

//authentication
app.use('/api/v1/authentication',authenticationRouter);

//adminLogin
app.use('/api/v1/adminlogin',adminLoginRouter);

//employee password
app.use('/api/v1/employeepassword',employeePasswordRouter);


app.all('*', (req, res, next) => {
  res.status(404)
//  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//app.use(globalErrorHandler);

module.exports = app;
