import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('form'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

let searchQuery = '';
let page = 1;
let totalPages = 0;

const onLoadMoreBtnClick = async () => {
  try {
    showLoader();
    hideLoadMoreButton();

    const nextPage = page + 1;
    const data = await getImagesByQuery(searchQuery, nextPage);
    createGallery(data.hits);
    page = nextPage;

    const galleryItem = document.querySelector('.gallery-item');

    if (galleryItem) {
      const { height } = galleryItem.getBoundingClientRect();

      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      return;
    }
    showLoadMoreButton();
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
};

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    const { currentTarget: searchFormEl } = event;
    const query = searchFormEl.elements['search-text'].value.trim();

    if (!query) {
      iziToast.error({
        message: 'Empty input!',
        position: 'topRight',
      });
      return;
    }

    searchQuery = query;

    clearGallery();
    showLoader();
    hideLoadMoreButton();
    page = 1;

    const data = await getImagesByQuery(searchQuery, page);
    totalPages = Math.ceil(data.totalHits / 15);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    if (totalPages === 1) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    if (totalPages > 1) {
      showLoadMoreButton();
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
refs.formEl.addEventListener('submit', onSearchFormSubmit);
