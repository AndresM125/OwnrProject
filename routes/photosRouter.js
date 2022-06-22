const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

const photosRouter = (photoService) => {
  const router = express.Router();

  router.post('/search', async (req, res) => {
    const users = await photoService.getPhotosForCategories(req.body.categoryIds);
    res.send(users);
  });

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    body('category_id').isNumeric(),
    body('photo_url').isURL().trim(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const photoAdded = await photoService.addPhoto(req.body.category_id, req.body.photo_url);

      res.send(photoAdded);
    });

  router.put(
    '/:photoId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

      const result = await photoService.editPhoto(req.params.photoId, req.body.categoryId, req.body.photoUrl);

      res.send(result);
    });

  router.delete(
    '/:photoId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

      await photoService.deletePhoto(req.params.photoId);

      res.status(200).end();
    });

  return router;
}


module.exports = photosRouter;
