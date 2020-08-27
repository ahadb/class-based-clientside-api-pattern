import Axios from 'axios';
import {ROOT_PATH} from './constants';

/**
 * @desc: simple interface for config
 */

interface Config {
  endpointPre: string;
  host: string;
  basePath: string;
  applicationId?: string;
}

/**
 * @desc: you will need to add your env variables if you want to use this
 */

const defaultEndpointPre: string = process.env.ENDPOINT_PREFIX || '';
const defaultHost: string = process.env.SERVICE_HOST || '';
const defaultBasePath: string = process.env.SERVICE_BASEPATH || 'v1/apis';


let config: Config = {
  endpointPre: defaultEndpointPre,
  host: defaultHost,
  basePath: defaultBasePath
};

export function getBaseUrl() {
  return config.host + config.basePath;
}

/**
 * @desc: returns config based on env variables, you will need to add that
 */

export const getConfig = (): Promise<Config> => {
  return new Promise((resolve, reject) => {
    const SERVER = process.env.SERVER;
    if (SERVER !== 'localhost') {
      Axios.get(`${ROOT_PATH}/${config}`)
        .then(response => {
          config = Object.assign(config, response.data);
          resolve(config);
        })
        .catch(() => {
          resolve(config);
        });
    } else {
      resolve(config);
    }
  });
};
