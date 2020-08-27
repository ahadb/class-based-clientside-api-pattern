var environments = {};
environments.DEV_ENV = {
    'httpPort': 8080,
    'httpsPort': 8081,
    'environmentName': 'development'
};
environments.STAGING_ENV = {
    'httpPort': 3000,
    'httpsPort': 3001,
    'environmentName': 'staging'
};
environments.PROD_ENV = {
    'httpPort': 5000,
    'httpsPort': 5001,
    'environmentName': 'production'
};
var currentEnv = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';
var exportedEnvironment = typeof (environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;
module.exports = exportedEnvironment;
