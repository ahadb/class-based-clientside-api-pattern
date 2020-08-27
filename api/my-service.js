"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_1 = require("../swagger");
var api_config_1 = require("./api-config");
var base_service_1 = require("./base-service");
/**
 * Base Config Class
 * @extends: BaseService
 */
var MyService = /** @class */ (function (_super) {
    __extends(MyService, _super);
    function MyService() {
        var _this = _super.call(this) || this;
        /**
         * Method
         * @param: paramaters
         * @returns: result as Axios Promise
         */
        _this.getAllData = function (parameters) {
            var oneParam = parameters.oneParam, twoParam = parameters.twoParam;
            var requestObj = { request: 'getAll', body: JSON.stringify(parameters) };
            var requestConfig = _this.baseRequestConfig(requestObj);
            var result = _this.getMyApi.get(requestConfig);
            return result;
        };
        _this.configure = function (apiConfig) {
            _this.getMyApi = swagger_1.Swagger_My_Api_Factory(apiConfig.axiosConfig, apiConfig.apiBaseURL);
        };
        return _this;
    }
    /**
     * Static Method
     * @returns: instance of my service
     */
    MyService.getInstance = function () {
        if (!MyService.myInstance) {
            var apiConfig = api_config_1.default.getInstance();
            MyService.myInstance = new MyService();
            MyService.myInstance.configure(apiConfig);
        }
        return MyService.myInstance;
    };
    return MyService;
}(base_service_1.default));
exports.default = MyService;
