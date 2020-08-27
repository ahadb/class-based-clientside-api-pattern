"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var constants_1 = require("./constants");
/**
 * @desc: you will need to add your env variables if you want to use this
 */
var defaultEndpointPre = process.env.ENDPOINT_PREFIX || '';
var defaultHost = process.env.SERVICE_HOST || '';
var defaultBasePath = process.env.SERVICE_BASEPATH || 'v1/apis';
var config = {
    endpointPre: defaultEndpointPre,
    host: defaultHost,
    basePath: defaultBasePath
};
function getBaseUrl() {
    return config.host + config.basePath;
}
exports.getBaseUrl = getBaseUrl;
/**
 * @desc: returns config based on env variables, you will need to add that
 */
exports.getConfig = function () {
    return new Promise(function (resolve, reject) {
        var SERVER = process.env.SERVER;
        if (SERVER !== 'localhost') {
            axios_1.default.get(constants_1.ROOT_PATH + "/" + config)
                .then(function (response) {
                config = Object.assign(config, response.data);
                resolve(config);
            })
                .catch(function () {
                resolve(config);
            });
        }
        else {
            resolve(config);
        }
    });
};
