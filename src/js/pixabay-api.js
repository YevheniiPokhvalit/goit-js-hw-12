import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY = '42800800-86f7251243bc7e4391903d90a';
const BASE_URL = 'https://pixabay.com/api/';
const loader = document.querySelector('.loader');

let perPage = 15;

export async function fetchDataFromAPI(searchQuery, currentPage) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: perPage,
  });

  loader.style.display = 'block';

  try {
    const response = await axios.get(`${BASE_URL}?${params}`);

    if (!response.status === 200) {
      throw new Error('Network response was not OK!');
    }

    const data = response.data;

    loader.style.display = 'none';

    if (data.hits.length === 0) {
      iziToast.error({
        close: false,
        messageColor: '#fff',
        timeout: 2000,
        backgroundColor: 'red',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
