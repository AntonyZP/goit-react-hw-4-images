import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api";
const API_KEY = '31704794-60eeb3a6ac83e8d6bcf335c57';

const fetchImages = async(searchImg, page) => {
    const response = await axios.get(`/?q=${searchImg}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data
}

export default fetchImages;
