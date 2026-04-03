import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  // create JWT with user id - used to authenticate future requests
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d", //token expires after 1 day
  });
};
