// const {hostname} = window.location;

// export const host = process.env.REACT_APP_PROD_URL; // Production url
const host = "171dzpmu9g.execute-api.us-east-2.amazonaws.com";
// export const host = /dev|local/.test(hostname)
//   ? process.env.REACT_APP_DEV_URL // in case its the local environment connect to development
//   : /uat/.test(hostname)
//     ? process.env.REACT_APP_STAGE_URL
//     : process.env.REACT_APP_QA_URL // Production url

const baseUrl = `https://${host}`;

// ========================= Auth urls ============================
export const socialLoginSignupUrl = () => `${baseUrl}/auth/social-login`;
export const signupUrl = () => `${baseUrl}/user/signup`;
export const sendVerificationEmailUrl = () =>
  `${baseUrl}/user/send-verification-email`;
export const verifyOtpUrl = () => `${baseUrl}/user/verify-otp`;
export const signinUrl = () => `${baseUrl}/user/signin`;
export const updateUserUrl = () => `${baseUrl}/user/user-details`;
export const forgotPasswordUrl = () => `${baseUrl}/auth/forgot-password`;
export const resetPasswordUrl = (token: string) =>
  `${baseUrl}/auth/reset-password/${token}`;

// ======================== Events urls ============================
export const getEventsUrl = ({ limit, skip, verified, date }) =>
  `${baseUrl}/events?limit=${limit}&skip=${skip}&verified=${verified}&date=${date}`;
export const createEventUrl = () => `${baseUrl}/events`;
export const getPreSignedUrlsUrl = () => `${baseUrl}/events/presigned-url`;
export const seedUrl = () => `${baseUrl}/events/seed-url`;
export const editEventUrl = (id: number) => `${baseUrl}/events/${id}`;
export const getEventDetailsUrl = (id: number) => `${baseUrl}/events/${id}`;
export const deleteEventUrl = (id: number) => `${baseUrl}/events/${id}`;

// ======================== Photos urls ============================
export const deletePhotosUrl = () => `${baseUrl}/photos`;
export const uploadEventPhotosUrl = (id: number) =>
  `${baseUrl}/events/upload/${id}`;

// ======================== Search urls ============================
export const searchUrl = () => `${baseUrl}/events/search`;
export const autoSuggestionUrl = () => `${baseUrl}/search/autosuggest`;

// ===================== Exclusion List urls =======================
export const getExcludedLocationsUrl = () => `${baseUrl}/excluded-locations`;
export const excludeLocationUrl = () => `${baseUrl}/exclude-location`;
export const deleteExcludeLocationUrl = (id) =>
  `${baseUrl}/excluded-location/${id}`;
