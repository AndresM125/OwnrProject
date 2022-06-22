const AdminUsersModel = require('../models/adminUsersModel');

const adminUsersRepo = (sequelize) => sequelize.define(
  "admin_users",
  AdminUsersModel,
  {
    createdAt: false,
    updatedAt: false
  });

module.exports = adminUsersRepo;