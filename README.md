### Class Based Pattern for API Requests

This is a fun project but not perfect - you will see a lot out of the box and can make tweaks yourself. The code uses the
assumption of a `Swagger` generated client and is written in TypeScript. Try Swagger for a change... 

> I am a fan of the humble function, a fan of JavaScript and exporting multiple functions. That being said I have seen client 
side request api's written in many ways over the years using our kindred humble function. 

More often then not we see the humble function exported when used to call API's, however I have observed the class based 
pattern can be very powerful, especially in larger projects. Reasons are quite obvious:

1. You have a simple base class that is the source of truth
2. You can do all your configuration easily and all instances will receive. This is far better than repeating code
3. You service class extends base class and makes any calls you get with your config, and whatever options you choose
4. Simply instantiate them in your components and your config class for app wide config in your app layer
5. Other obvious OOP reasons

Although the class just de-sugars to the prototype i found that it can be a useful pattern even for a person who
thinks classes are a plague to JavaScript.

## Usage

This code is not perfect, however it's aim is to help us understand the concept of the power of class - yes even in 
JavaScript. Again, this all de-sugars down to the prototype anyway when we use Class or with TypeScript.

It will give you a good understanding of how to set this up for larger projects so you maintain your state easily and
not have to repeat lines of code.

You can see how it has been set up and follow a similar pattern. This also assumes you have a `Swagger` client generated
and are using TypeScript for your models, interfaces etc.

### Inspiration

The inspiration for this fun little project came from while doing a little research on using async / await in a class. 
I was curious. 

OOP nerds (which i am not one of but appreciate it) will say technically this might be a bad pattern when using a 
constructor to return a promise, it should only return an instance of it's class:

```javascript
class Test {
  constructor() {
    return new Promise((res, rej) => {      
      this.getData().then(({userId, title}) => {
        this.userId = userId;
        this.title = title;
        
        res(this);
      });
    });
  }
  
  getData(){
    return fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())      
  }
  
  greet(){    
    console.log('hello');
  }
}


(async() => {
  const x = await new Test();
  console.log(x.userId, ' : ', x.title);
})();
```

...this is better:

```javascript
class myClass {
    constructor (async_param) {
        if (typeof async_param === 'undefined') {
            throw new Error('Cannot be called directly');
        }
    }

    static async build () {
        var async_result = await doSomeAsyncStuff();
        return new myClass(async_result);
    }
}
```

...and the pattern in our library follows the right procedure:

```typescript
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
```

extends:

```typescript
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
```

### Note

Have left the mappings for `.js`, `.jsx` and `.ts`. There is no notion of a build or webpack so
don't even think of running it - we are concentrating and focusing on the pattern in code.


