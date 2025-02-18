const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gera um JWT para autenticação (sem verificação de credenciais)
 */

/**
 * @swagger
 * /api/auth:
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
router.get('/auth', (req, res) => {

  const user = { username: 'admin' };  // Exemplo de usuário

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

module.exports = router;