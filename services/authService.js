const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class AuthService {

  constructor(adminUsersRepo) {
    this.adminUsersRepo = adminUsersRepo;
  }

  async getUser(email) {
    const user = await this.adminUsersRepo.findByPk(email);
    return user;
  }

  async login(email, password) {
    const user = await this.adminUsersRepo.findByPk(email);
    if (user == null) {
      return null;
    }

    var res = await bcrypt.compare(password, user.password_hash);
    if (res !== true) {
      return null;
    }

    return jwt.sign(
      {
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      },
      process.env.SIGNING_KEY,
      { expiresIn: '2 days' },
    );
  }
}

module.exports = (sequelize) => new AuthService(sequelize);
