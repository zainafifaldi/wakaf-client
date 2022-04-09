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
      timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    API_METHODS.forEach(method => {
      Object.defineProperty(this, method, {
        value: (url, options = {}) => this.request(url, method, options),
      });
    });
  }

  async request(url, method, options = {}) {
    try {
      const response = await this.instance.request({
        ...options,
        url,
        method,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
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
