/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import axios from 'app/Services/http';

class Service {
  static handleError = (
    err,
  ): { error: string | any; data?: null; message?: null } => {
    if (!err.response) {
      return {
        error:
          'It seems that you are offline. Try to check your network cable.',
      };
    }
    const { data } = err.response;
    const { error, msg } = data;

    if (msg) {
      return { error: msg };
    }

    if (typeof error !== 'string') {
      return { error: 'Unknown error' };
    }

    return { error };
  };

  static resolveResponse = (response: AxiosResponse<any>) => {
    const { data, error, message } = response.data;

    return {
      data,
      message,
      error,
    };
  };

  static async get(url: string) {
    return axios
      .get(url)
      .then(this.resolveResponse)
      .catch(this.handleError);
  }

  static async post(url: string, data: any, params = {}) {
    return axios
      .post(url, data, { params })
      .then(this.resolveResponse)
      .catch(this.handleError);
  }

  static async put(url: string, data: any) {
    return axios
      .put(url, data)
      .then(this.resolveResponse)
      .catch(this.handleError);
  }

  static async delete(url: string, data: any) {
    return axios
      .post(url, data)
      .then(this.resolveResponse)
      .catch(this.handleError);
  }
}

export default Service;
