const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

const development = {
  name: 'development',
  asset_path: '/assets',
  session_cokkie_key: 'blahSomething',
  db: 'dbSocialMate:SocialMate@cluster0.cuvwg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  google_client_id:
    '544958648420-3jda5u56f02sah5umrmul251b8g769ch.apps.googleusercontent.com',
  google_client_secret: 'ikk8hhI8Yzu-l44EFMFXs_77',
  google_call_back_url: 'http://localhost:8000/user/auth/google/callback',
  jwt_secret: 'codeial',

  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
};

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
