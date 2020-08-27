"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var configUtils_1 = require("../helpers/configUtils");
/**
 * Base Service Class
 */
var BaseService = /** @class */ (function () {
    function BaseService() {
        /**
         * Public Method
         * Method
         * @param: Object requestObj
         * @returns: AxiosRequestConfig
         */
        this.baseRequestConfig = function (requestObj) {
            // whatever headers you want
            var requestConfig = {
                headers: {
                    'Cache-control': '' +
                        'no-store, ' +
                        'no-cache',
                    Pragma: 'no-cache', Expires: 0
                },
                statusValidation: function (status) {
                    var myBaseURL = configUtils_1.getBaseUrl();
                    // do some validations for status
                    // ...
                    if (status === 401 && myBaseURL) {
                        // do some stuff
                    }
                    return status >= 200 && status < 300;
                }
            };
            return requestConfig;
        };
    }
    return BaseService;
}());
exports.default = BaseService;
