// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const webhookRoutes = require('./routes/webhookRoutes.js'); // Add this
const feedbackRoutes = require('./routes/feedbackRoutes');
const machineRoutes = require('./routes/machineRoutes');
const variationRoutes = require('./routes/variationRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Your static Swagger JSON file



dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use('/api/webhooks', express.raw({ type: 'application/json' })); // Raw body for webhooks
app.use(express.json()); // JSON for other routes
connectDB();


// Swagger Docs Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Routes
app.get('/', (req, res) => res.send('Hello, World!'));
app.use('/api/users', userRoutes);
app.use('/api/webhooks', webhookRoutes); // Mount webhook routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/variations', variationRoutes);


// API routes
app.use("/api/users", userRoutes );  // user-related routes


module.exports = app;