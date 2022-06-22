const AnimalPhotoModel = require('../models/animalPhotoModel');

const animalPhotoRepo = (sequelize) => sequelize.define(
  "animal_photos",
  AnimalPhotoModel,
  {
    createdAt: false,
    updatedAt: false
  });

module.exports = animalPhotoRepo;