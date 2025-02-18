const express = require('express');
const databaseController = require('../Domain/DataBase/Controllers/DatabaseController');
const authMiddleware = require('../Middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: DataBase
 *     description: Geração do Banco via ORM
 */

/**
 * @swagger
 * /api/database/create:
 *   get:
 *     summary: Cria o banco de dados e as tabelas
 *     description: Cria o banco de dados e a tabela tasks, apagando tudo existente
 *     tags:
 *       - DataBase
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Banco de dados e tabela criados com sucesso
 *       500:
 *         description: Erro ao criar banco de dados e tabela
 */
router.get('/database/create', authMiddleware, databaseController.createDatabase); // Adicione o middleware aqui

module.exports = router;
