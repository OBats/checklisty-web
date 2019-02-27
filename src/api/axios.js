import axios from 'axios';

const getToken = () => localStorage.getItem('access-token');

// const baseURL = process.env.REACT_BASE_URL;
const baseURL = 'http://localhost:3030';

export default axios.create({
  baseURL,
  headers: {
    'access-token': getToken(),
  },
});
