export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "mysecretkey123",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};
