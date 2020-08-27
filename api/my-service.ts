import {Swagger_My_Api_Factory, Swagger_My_Service_GET, Swagger_My_Api_Interface, Swagger_My_Service} from '../swagger';
import {AxiosPromise} from 'axios';
import {BaseRequest, MyParameters} from '../helpers/interfaces';
import APIConfig from './api-config';
import BaseService from './base-service';

/**
 * Base Config Class
 * @extends: BaseService
 */

export default class MyService extends BaseService<Swagger_My_Api_Interface> {
  private static myInstance: MyService;

  private getMyApi: Swagger_My_Api_Interface;

  private constructor() {
    super();
  }

  /**
   * Method
   * @param: paramaters
   * @returns: result as Axios Promise
   */

  public getAllData = (parameters: MyParameters<Swagger_My_Service>): AxiosPromise<Swagger_My_Service_GET> => {
    const {oneParam, twoParam} = parameters;

    const requestObj: BaseRequest<Swagger_My_Api_Interface> = {request: 'getAll', body: JSON.stringify(parameters)};
    const requestConfig = this.baseRequestConfig(requestObj);
    const result = this.getMyApi.get(requestConfig) as AxiosPromise<Swagger_My_Service_GET>;

    return result;
  };


  public configure = (apiConfig: APIConfig) => {
    this.getMyApi = Swagger_My_Api_Factory(apiConfig.axiosConfig, apiConfig.apiBaseURL);
  };

  /**
   * Static Method
   * @returns: instance of my service
   */

  public static getInstance(): MyService {
    if (!MyService.myInstance) {
      const apiConfig: APIConfig = APIConfig.getInstance();
      MyService.myInstance = new MyService();
      MyService.myInstance.configure(apiConfig);
    }

    return MyService.myInstance;
  }
}
