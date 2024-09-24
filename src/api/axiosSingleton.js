import axios from 'axios';
import config from '../config';

let singleton = null;

const axiosSingleton = async () => {
  if (!singleton) {
    const tokenURL = config.drupal_url + '/session/token';
    try {
      const response = await axios.get(tokenURL, {
        withCredentials: true,
      });
      const csrfToken = response.data;
      singleton = axios.create({
        baseURL: config.drupal_url,
        withCredentials: true,
        headers: { 'X-CSRF-Token': csrfToken },
        params: { _format: 'json' },
      });
    } catch (error) {
      console.error(error);
    }
  }
  return singleton;
};

export default axiosSingleton;
