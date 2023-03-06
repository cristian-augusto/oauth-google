import jwt from "jsonwebtoken";
import AppConfig from "../config/AppConfig";
import User from "../models/user.model";

export default class JwtHelper {
  static getToken(user: User) {
    const { SECRET_KEY, EXPIRES } = AppConfig.Jwt;
    const token = jwt.sign({id_user: user.id_user}, SECRET_KEY, {
      expiresIn: EXPIRES,
    });

    return token;
  }
}
