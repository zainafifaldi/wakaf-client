import { Banner } from 'interfaces/banner';
import ApiClient from '.';

const api = {
  getBanners() {
    return ApiClient.get<Banner[]>('/banners', 'public');
  },
}

export default api;
