import { injectable, inject } from "tsyringe";
import { InjectionTokenEnum } from "../config/containers";
import AppError from "../exceptions/app-error.exception";
import JwtHelper from "../helpers/jwt.helper";
import OAuthGoogleHelper from "../helpers/oauth-google.helper";
import IUsersRepository from "../repositories/users.repository";

type IRequest = { code: string };

type IResponse = { token: string };

@injectable()
export default class OAuthGoogleService {
  constructor(
    @inject(InjectionTokenEnum.IUsersRepository)
    private usersRepository: IUsersRepository
  ) {}
  async execute({ code }: IRequest): Promise<IResponse> {
    const { id_token, access_token } =
      await OAuthGoogleHelper.getGoogleOauthToken({ code });

    const { name, verified_email, email, picture } =
      await OAuthGoogleHelper.getGoogleUser({
        id_token,
        access_token,
      });

    if (!verified_email) {
      throw new AppError("E-mail not verified.");
    }

    let user = await this.usersRepository.findByEmail(email);

    if (user) {
      user.name = name;
      user.profile_pic = picture;
      user.updated_at = new Date();

      await this.usersRepository.update(user.id_user, user);
    } else {
      user = await this.usersRepository.create({
        name,
        email,
        profile_pic: picture,
        provider: "google",
        updated_at: new Date(),
        created_at: new Date(),
      });
    }

    const token = JwtHelper.getToken(user);

    return { token };
  }
}
