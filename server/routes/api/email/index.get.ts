import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  useEnv().GOOGLE_CLIENT_ID,
  useEnv().GOOGLE_CLIENT_SECRET,
);

export default defineEventHandler(async (event) => {
  const { token, pageToken } = await readBody(event);
  if (!token) {
    throw createError({ statusCode: 400, message: "Missing token" });
  }
  oAuth2Client.setCredentials(token);
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const res = await gmail.users.messages.list({
    userId: "me",
    ...(pageToken && { pageToken }),
  });
  return res.data;
});
