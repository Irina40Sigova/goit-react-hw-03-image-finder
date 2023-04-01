import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '33671711-e7c4a63df0ba9dde612e7c95b';
const NUANCES =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=12';

async function fetchApi(nextQuery, nextPage) {
  const response = await axios.get(
    `?key=${API_KEY}&q=${nextQuery}&${NUANCES}&page=${nextPage}`
  );
  return response.data;
}

export default fetchApi;
