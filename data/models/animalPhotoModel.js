const DataTypes = require("sequelize");

const AnimalPhotoModel = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: DataTypes.INTEGER,
  photo_url: DataTypes.TEXT
}

module.exports = AnimalPhotoModel;