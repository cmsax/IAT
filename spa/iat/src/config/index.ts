export const BASIC = {
  location:
    process.env.NODE_ENV == "production"
      ? "https://api.unoiou.com/"
      : "http://localhost:3000/"
};
