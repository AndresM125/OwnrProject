const DataTypes = require("sequelize");

const AdminUsersModel = {
  email: {
    type: DataTypes.TEXT,
    primaryKey: true
  },
  password_hash: DataTypes.TEXT,
  first_name: DataTypes.TEXT,
  last_name: DataTypes.TEXT,
}

module.exports = AdminUsersModel;