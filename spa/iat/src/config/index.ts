export const BASIC = {
  location:
    process.env.NODE_ENV == "production"
      ? "https://api.unoiou.com/feiwei/iat"
      : "http://localhost:3000"
};
