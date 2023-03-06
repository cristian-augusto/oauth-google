const GOOGLE_ROOT_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_REDIRECT_URL = "http://localhost:8000/api/session/oauth/google";
const GOOGLE_CLIENT_ID = "";

export const getGoogleUrl = (from) => {
  const options = {
    redirect_uri: GOOGLE_REDIRECT_URL,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${GOOGLE_ROOT_URL}?${qs.toString()}`;
};
