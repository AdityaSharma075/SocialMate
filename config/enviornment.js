const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {};

const production = {
  name: 'production',
  asset_path: process.env.SOCIALMATE_ASSETS_PATH,
  session_cokkie_key: process.env.SOCIALMATE_SESSION_COKKIE_KEY,
  db: process.env.SOCIALMATE_DB,
  google_client_id: process.env.SOCIALMATE_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.SOCIALMATE_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.SOCIALMATE_GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.SOCIALMATE_JWT_SECRET,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.SOCIALMATE_ENVIORNMENT) == undefined
    ? development
    : eval(process.env.SOCIALMATE_ENVIORNMENT);
// module.exports = production;
