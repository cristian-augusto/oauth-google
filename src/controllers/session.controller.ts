import { CookieOptions, Request, Response } from "express";
import { container } from "tsyringe";
import AppError from "../exceptions/app-error.exception";
import OAuthGoogleService from "../services/oauth-google.service";
import AppConfig from "../config/AppConfig";

export default class SessionController {
  static async google(request: Request, response: Response): Promise<void> {
    const code = request.query.code as string;
    const pathUrl = (request.query.state as string) || "/";

    if (!code) {
      new AppError("Authorization code not provided!");
    }

    const oauthGoogle = container.resolve(OAuthGoogleService);
    const { token } = await oauthGoogle.execute({ code });

    const accessTokenCookieOptions: CookieOptions = {
      expires: new Date(Date.now() + AppConfig.Jwt.EXPIRES * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
      maxAge: AppConfig.Jwt.EXPIRES * 60 * 1000,
    };

    response.cookie("access-token", token, accessTokenCookieOptions);
    response.cookie("logged_in", true, accessTokenCookieOptions);

    return response.redirect(`${process.env.ORIGIN}${pathUrl}`);
  }
}
