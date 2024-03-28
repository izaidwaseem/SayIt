// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const productRoutes = require('./routes/productRoutes'); 
// const cors = require('cors'); 
// const app = express();
// const port = 3000;

// app.use('/assets', express.static('backend/assets'));

// app.use(cors());
// app.use(bodyParser.json());

// // Use product routes
// app.use('/api', productRoutes);

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// mongoose.connect('mongodb://127.0.0.1:27017/wearablesDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('Database connection successful.'))
// .catch(error => console.error('Error connecting database', error));

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/users/signupRoutes')
const loginRoutes = require('./routes/users/loginRoutes')
const cors = require('cors');
const path = require('path'); // Import the path module
const { createUser } = require('./controllers/users-controllers/signupController');
const app = express();
const port = 3000;


// console.log(__dirname);
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Use product routes
app.use('/api', productRoutes);
app.use('/', userRoutes)
app.use('/', loginRoutes)



mongoose.connect('mongodb://127.0.0.1:27017/wearablesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database connection successful.'))
.catch(error => console.error('Error connecting database', error));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
