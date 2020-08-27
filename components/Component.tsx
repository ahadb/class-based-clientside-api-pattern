import React, {useEffect, useState} from 'react';
import { AxiosResponse } from 'axios';
import { MyServiceGET } from '../../swagger';
import MyService from '../api/my-service';

/**
 * @desc: instantiate the service and below you can start making calls
 */

const myService = MyService.getInstance();

/**
 * @desc: a contrived example, impetus is on setting up the services
 */

const Component = () => {

  const [data, setData] = useState([])

  const getAllData = async () => {

    const params = {};

    try {
      const result: AxiosResponse<MyServiceGET> = await myService.getAllData(params);

      setData(result)
    } catch (ex) {
      // catch here
    }
  };

  useEffect(() => {
    getAllData()
  }, [data]);

  return (
    <div>{data}</div>
  )
};

export default Component;
