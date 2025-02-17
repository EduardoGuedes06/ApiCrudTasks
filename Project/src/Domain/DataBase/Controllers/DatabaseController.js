const sequelize = require('../../../config/database');
const TaskModel = require('../../../Infrastructure/Database/Sequelize/TaskModel');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

exports.createDatabase = async (req, res) => {
  try {
    const dbName = process.env.DB_NAME;
    const tempSequelize = new Sequelize({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      dialect: 'postgres',
    });

    const [result] = await tempSequelize.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);

    if (result.length === 0) {
      await tempSequelize.query(`CREATE DATABASE ${dbName}`);
    }

    tempSequelize.config.database = dbName;
    tempSequelize.options.database = dbName;

    await tempSequelize.authenticate();

    const tableExists = await tempSequelize.getQueryInterface().tableExists('Tasks');
    if (tableExists) {
      await tempSequelize.getQueryInterface().dropTable('Tasks');
    }

    await TaskModel.sync({ force: true });

    res.status(200).json({ message: 'Banco de dados e tabela Tasks recriados com sucesso!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao recriar banco de dados e tabela.', error });
  }
};
