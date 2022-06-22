const express = require('express');
var passport = require('passport');
const { body, validationResult } = require('express-validator');

const authRouter = (authService) => {
  const router = express.Router();

  router.post(
    '/login',
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      console.log(req.body.email);
      console.log(req.body.password);

      const token = await authService.login(req.body.email, req.body.password);
      if (token == null) {
        res.status(400).end();
        return;
      }

      res.send({
        token
      });
    });

  return router;
}

module.exports = authRouter;