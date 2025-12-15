export default () => {
  if (!process.env.PORT)
    throw new Error('PORT environment variable is not defined');
  if (!process.env.DB_PORT) throw new Error('DB_PORT is not defined');

  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT, // keep string for @IsPort()
    SECRET: process.env.SECRET,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT, 10),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  };
};
