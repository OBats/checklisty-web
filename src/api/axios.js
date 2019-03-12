import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_URL : 'http://localhost:3030';

export default axios.create({
  baseURL,
});
