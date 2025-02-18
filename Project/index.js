const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const jsdoc = require('swagger-jsdoc');
require('dotenv').config();

const taskRoutes = require('./src/Routes/TaskRoutes');
const databaseRoutes = require('./src/Routes/DatabaseRoutes');
const AuthRoutes = require('./src/Routes/AuthRoutes');

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '1.0.0',
      description: 'Uma simples API',
    },
  },
  apis: ['./src/Routes/TaskRoutes.js', './src/Routes/DatabaseRoutes.js', './src/Routes/AuthRoutes.js'],
};


const swaggerDocs = jsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', databaseRoutes);
app.use('/api', AuthRoutes);

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
