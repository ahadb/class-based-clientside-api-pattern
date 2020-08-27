import {BaseRequest} from '../helpers/interfaces';
import {AxiosPromise, AxiosRequestConfig} from 'axios';
import {getBaseUrl} from '../helpers/configUtils';

/**
 * Base Service Class
 */

export default class BaseService<T> {

  /**
   * Public Method
   * Method
   * @param: Object requestObj
   * @returns: AxiosRequestConfig
   */

  public baseRequestConfig = (requestObj: BaseRequest<T>): AxiosRequestConfig => {

    // whatever headers you want
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Cache-control': '' +
          'no-store, ' +
          'no-cache',
        Pragma: 'no-cache', Expires: 0
      },
      statusValidation: status => {
        const myBaseURL = getBaseUrl();

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
