module.exports = {
  db: {
    pghost: process.env.PGHOST || 'localhost',
  },
  api: {
    port: process.env.API_PORT || 4000,
    host: process.env.API_HOST || 'localhost',
  },
}
