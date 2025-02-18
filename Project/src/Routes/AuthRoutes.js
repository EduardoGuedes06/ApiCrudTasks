const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../Middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gera um JWT para autenticação (sem verificação de credenciais)
 */

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     summary: Gera um token JWT
 *     description: Gerar um token JWT para acesso às rotas protegidas
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */
router.get('/protected', authMiddleware, (req, res) => {
    res.json({
      message: 'Você tem acesso à rota protegida!',
    });
  });

module.exports = router;