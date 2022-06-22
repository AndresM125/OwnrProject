const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const configurePassportStrategy = function (passport, authService) {

  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SIGNING_KEY;

  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    var user = await authService.getUser(jwt_payload.email);
    if (user == null) {
      return done(null, false);
    }
    return done(null, user);
  }));
}

module.exports = configurePassportStrategy;