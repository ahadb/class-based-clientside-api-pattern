"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_1 = require("../swagger");
var my_service_1 = require("./my-service");
/**
 * Base Config Class
 */
var APIConfig = /** @class */ (function () {
    function APIConfig() {
        var _this = this;
        this.apiBaseURL = '';
        this.axiosConfig = new swagger_1.Configuration();
        /**
         * Method
         * configures all services, add your extra services here
         */
        this.configureAllServices = function () {
            my_service_1.default.getInstance().configure(_this);
        };
        /**
         * Method
         * @params: options
         * configures
         */
        this.configure = function (options) {
            var serviceHost = options.serviceHost, serviceBasePath = options.serviceBasePath, axiosConfig = options.axiosConfig;
            _this.apiBaseURL = serviceHost + serviceBasePath;
            _this.axiosConfig = axiosConfig;
            // configure services with fetched configuration
            _this.configureAllServices();
        };
    }
    /**
     * Method
     * @returns: instance
     */
    APIConfig.getInstance = function () {
        if (!APIConfig.myInstance) {
            APIConfig.myInstance = new APIConfig();
        }
        return APIConfig.myInstance;
    };
    return APIConfig;
}());
exports.default = APIConfig;
