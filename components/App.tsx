import React, { useEffect, useState } from 'react';
import { getConfig } from '../helpers/configUtils';
import { Configuration } from '../swagger';
import APIConfig from '../api/api-config';
import Component from './Component';

/**
 * @desc: instantiate the config and configure api if needed
 */

const apiConfig: APIConfig = APIConfig.getInstance();

const App = () => {

  const initializeConfig = async () => {
    let config = await getConfig();
    const { host, basePath } = config;
    apiConfig.configure({ host: host, basePath: basePath, axiosConfig: new Configuration() });
  };

  useEffect(() => {
    initializeConfig();
  }, []);

  return (
    <React.Fragment>
      <Component />
    </React.Fragment>
  );
};

export default App;
