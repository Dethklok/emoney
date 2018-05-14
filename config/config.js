module.exports = {
  development: {
    username: process.env.DEV_DB_USERNAME || 'emoney',
    password: process.env.DEV_DB_PASSWORD || 'emoney123',
    database: process.env.DEV_DB_NAME || 'emoney',
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 5432,
    dialect: 'postgres',
  },
  test: {
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT) || 27017,
    name: process.env.TEST_DB_NAME || 'test'
  },
  production: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    dialect: 'postgres',
  }
};