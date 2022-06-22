const DataTypes = require("sequelize");

const AnimalCategoryModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: DataTypes.TEXT,
}

module.exports = AnimalCategoryModel;