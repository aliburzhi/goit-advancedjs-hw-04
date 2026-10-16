import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export const getImagesByQuery = async (query, page) => {
  const requestParams = {
    key: '23365926-b4db738b99f20e424398823c4',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page,
  };

  const response = await axios.get('/api/', { params: requestParams });
  return response.data;
};
