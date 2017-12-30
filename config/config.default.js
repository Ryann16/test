'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1514478561776_4020';

  // add your config here
  config.middleware = [];

  config.bodyParser = {
    jsonLimit: '10mb',
    enableTypes: ['text', 'json', 'form'],
    encode: ['utf-8', 'gzip'],
    detectJSON: function (ctx) {
      return /\.json$/i.test(ctx.path);
    },
    json: {
      type: 'text/plain'
    }
  };

  return config;
};
