let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.environment = 'dev';
appConfig.db = {
    url : 'mongodb://127.0.0.1:27017/expenser'
}

module.exports = {
    port : appConfig.port,
     allowedCorsOrigin: appConfig.allowedCorsOrigin,
     environment: appConfig.environment,
     db: appConfig.db
}