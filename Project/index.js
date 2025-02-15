const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const jsdoc = require('swagger-jsdoc');
require('dotenv').config();
const taskRoutes = require('./src/Routes/TaskRoutes');

const app = express();
const port = process.env.PORT;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do API',
      version: '1.0.0',
      description: 'Uma API simples para gerenciar tarefas',
    },
  },
  apis: ['./src/Routes/TaskRoutes.js'],
};


const swaggerDocs = jsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
