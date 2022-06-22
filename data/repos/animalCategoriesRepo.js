const AnimalCategoryModel = require('../models/animalCategoryModel');

const animalCategoriesRepo = (sequelize) => sequelize.define(
  "animal_categories",
  AnimalCategoryModel,
  {
    createdAt: false,
    updatedAt: false
  });

module.exports = animalCategoriesRepo