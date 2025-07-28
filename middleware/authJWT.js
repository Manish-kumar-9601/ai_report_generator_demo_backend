import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
req.user = { username: null, verified: false };
const { privateKey } = process.env;
const bearerHeader = req.headers["authorization"];
if (typeof bearerHeader !== "undefined") {
  const bearerToken = bearerHeader.split(" ")[1];
  jwt.verify(bearerToken, privateKey, function (err, data) {
    if (!(err && typeof data === "undefined")) {
      req.user = { username: data.username, verified: true };
      next();
    }
  });
}
return res.sendStatus(403);
};

// export const isAdmin = async (req, res, next) => {
//   const user = await User.findByPk(req.userId);
//   const roles = await user.getRoles();
//   if (roles.some((role) => role.name === "admin")) {
//     return next();
//   }
//   return res.status(403).send({ message: "Require Admin Role!" });
// };

// export const isModerator = async (req, res, next) => {
//   const user = await User.findByPk(req.userId);
//   const roles = await user.getRoles();
//   if (roles.some((role) => role.name === "moderator")) {
//     return next();
//   }
//   return res.status(403).send({ message: "Require Moderator Role!" });
// };

// export const isModeratorOrAdmin = async (req, res, next) => {
//   const user = await User.findByPk(req.userId);
//   const roles = await user.getRoles();
//   const hasAccess = roles.some((role) =>
//     ["moderator", "admin"].includes(role.name)
//   );
//   if (hasAccess) {
//     return next();
//   }
//   return res.status(403).send({ message: "Require Moderator or Admin Role!" });
// };
