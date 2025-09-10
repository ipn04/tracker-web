const appConfig = {
  // prevent redirection if 401 is received
//   whitelistUrl: [
//     '/login',
//   ],
  env: import.meta.env.MODE,
  apiUrl: import.meta.env.VITE_API_URL
};

export default appConfig;
