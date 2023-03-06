import { config } from "dotenv";

config({ path: `./.env.${process.env.NOV_ENV || "development"}` });

const AppConfig = {
  App: {
    PORT: process.env.PORT ? Number(process.env.PORT) : 5000,
  },
  Jwt: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "",
    EXPIRES: 60 * 60 * 24,
  },
  Libs: {
    Google: {
      CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      REDIRECT_URL: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    },
    Supabase: {
      URL: process.env.SUPABASE_URL || "",
      KEY: process.env.SUPABASE_KEY || "",
    },
  },
};

export default AppConfig;
