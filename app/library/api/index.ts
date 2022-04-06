import axios, { AxiosInstance } from 'axios';

interface WrappedInterface {
  [key: string]: Function
}

const API_METHODS: string[] = ['get', 'post', 'patch', 'put', 'delete'];

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_HOST,
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    API_METHODS.forEach(method => {
      Object.defineProperty(this, method, {
        value: this.instance[method],
      });
    });
  }

  wrap(interfaces: object): WrappedInterface {
    const wrappedInterfaces: WrappedInterface = {};
    Object.keys(interfaces).forEach((key) => {
      wrappedInterfaces[key] = (...args) => {
        return interfaces[key].bind(this)(...args);
      };
    });

    return wrappedInterfaces;
  }
}

export default new ApiClient();
