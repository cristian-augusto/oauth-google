import axios from "axios";
import qs from "qs";
import AppConfig from "../config/AppConfig";

export default class OAuthGoogleHelper {
  static async getGoogleOauthToken({ code }: { code: string }) {
    try {
      const rootURl = "https://oauth2.googleapis.com/token";

      const options = {
        code,
        client_id: AppConfig.Libs.Google.CLIENT_ID,
        client_secret: AppConfig.Libs.Google.CLIENT_SECRET,
        redirect_uri: AppConfig.Libs.Google.REDIRECT_URL,
        grant_type: "authorization_code",
      };

      const body = qs.stringify(options);

      const { data } = await axios.post(rootURl, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return data;
    } catch (err) {
      console.log("Failed to fetch Google Oauth Tokens");
      throw err;
    }
  }

  static async getGoogleUser({
    id_token,
    access_token,
  }: {
    id_token: string;
    access_token: string;
  }) {
    try {
      const { data } = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        }
      );

      return data;
    } catch (err) {
      console.log("Failed to fetch Google User!");
      throw err;
    }
  }
}
