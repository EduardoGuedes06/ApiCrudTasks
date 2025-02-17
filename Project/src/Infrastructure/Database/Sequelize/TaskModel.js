const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const TaskModel = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Pendente', 'Em andamento', 'Concluída'),
    defaultValue: 'Pendente',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = TaskModel;
