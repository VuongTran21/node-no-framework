// Container all environments

const environments = {};

// Specific environment for staging
environments.staging = {
    port: 3000,
    envName: 'staging'
};

// Specific environment for production
environments.production = {
    port: 8000,
    envName: 'production'
};

let currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

let envToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv] : environments.staging;

module.exports = envToExport;