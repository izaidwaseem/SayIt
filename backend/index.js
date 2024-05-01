// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/users/signupRoutes')
// const loginRoutes = require('./routes/users/loginRoutes')
// const cors = require('cors');
// const path = require('path'); // Import the path module
// const { createUser } = require('./controllers/users-controllers/signupController');
// const app = express();
// const port = 3000;


// // console.log(__dirname);
// dotenv.config();

// app.use(cors());
// app.use(bodyParser.json());

// // Use product routes
// app.use('/api', productRoutes);
// app.use('/', userRoutes)
// app.use('/', loginRoutes)



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
const userRoutes = require('./routes/users/signupRoutes');
const loginRoutes = require('./routes/users/loginRoutes');
const multer = require('multer'); // Import Multer
const cors = require('cors');
const path = require('path'); // Import the path module
const { createUser } = require('./controllers/users-controllers/signupController');
const app = express();
const port = 3000;

// console.log(__dirname);
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Specify the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, 'wearables.csv'); // Use the filename 'wearables.csv'
  }
});

const upload = multer({ storage: storage });

// Use Multer middleware to handle file uploads
app.use(upload.single('csvFile')); // Assuming the file input in your form is named 'csvFile'

// Use product routes
app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', loginRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/wearablesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database connection successful.'))
  .catch(error => console.error('Error connecting database', error));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
