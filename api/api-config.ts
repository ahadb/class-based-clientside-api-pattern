import {Configuration} from '../swagger';
import MyService from './my-service';

/**
 * Base Config Class
 */

export default class APIConfig {
  private static myInstance: APIConfig;

  public apiBaseURL: string = '';
  public axiosConfig: Configuration = new Configuration();

  /**
   * Method
   * @returns: instance
   */

  public static getInstance(): APIConfig {
    if (!APIConfig.myInstance) {
      APIConfig.myInstance = new APIConfig();
    }

    return APIConfig.myInstance;
  }

  /**
   * Method
   * configures all services, add your extra services here
   */

  public configureAllServices = () => {
    MyService.getInstance().configure(this);
  };

  /**
   * Method
   * @params: options
   * configures
   */

  public configure = (options: APIConfigProperties): void => {
    const {serviceHost, serviceBasePath, axiosConfig} = options;
    this.apiBaseURL = serviceHost + serviceBasePath;
    this.axiosConfig = axiosConfig;

    // configure services with fetched configuration
    this.configureAllServices();
  };
}
