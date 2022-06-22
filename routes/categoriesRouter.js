const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const categoriesRouter = (categoryService) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const categories = await categoryService.getCategories();
    res.send(categories);
  });

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    body('category').not().isEmpty().trim().escape(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const categoryAdded = await categoryService.addCategory(req.body.category);

      res.send(categoryAdded);
    });

  router.put(
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

      const result = await categoryService.editCategory(req.params.categoryId, req.body.category);

      res.send(result);
    });

  router.delete(
    '/:categoryId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

      await categoryService.deleteCategory(req.params.categoryId);

      res.status(200).end();
    });

  return router;
}

module.exports = categoriesRouter;

//TODO: don't exit if there's a crash