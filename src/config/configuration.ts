export default () => {
  if (!process.env.PORT) {
    throw new Error('PORT environment variable is not defined');
  }

  if (!process.env.DB_PORT) {
    throw new Error('DB_PORT is not defined');
  }

  return {
    port: parseInt(process.env.PORT, 10),
    secret: process.env.SECRET,

    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT, 10),
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };
};
