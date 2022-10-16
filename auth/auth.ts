const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');

export interface AuthOptions {
  jwtSecret: string
  issuer: string
  audience: string
}

export const configureAuthStrategy = (options: AuthOptions) => {
  const strategyOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: options.jwtSecret,
    issuer: options.issuer,
    audience: options.audience,
    ignoreExpiration: true, // Note: This has been set to true just for the purposes of the challenge.
  };

  passport.use(
    new JWTstrategy(strategyOptions, (token, done) => {
      try {
        if (token.hasOwnProperty('email')) {
          // DISCLAIMER: this is done simply to showcase the ease of adding
          // authentication to the API. Currently the strategy is set to ignore
          // the `exp` claim in the token.
          return done(null, { email: token.email, userId: token.sub });
        }

        // assume invalid token
        return done(null, false);
      } catch (error) {
        done(error);
      }
    })
  );
};

export const authenticatedRoute = (options: { session: boolean }) => {
  return passport.authenticate('jwt', { session: options.session });
};
