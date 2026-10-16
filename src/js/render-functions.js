import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  galleryEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionPosition: 'bottom',
  captionsData: 'alt',
  captionDelay: 250,
});

// Ця функція повинна приймати масив images, створювати HTML-розмітку для галереї, додавати її в контейнер галереї та викликати метод екземпляра SimpleLightbox refresh(). Нічого не повертає.
export const createGallery = images => {
  const markUp = images
    .map(
      image => `
          <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
              <img
                class="gallery-image"
                src="${image.webformatURL}"
                alt="${image.tags}"
              >
            </a>
             <table class="gallery-table">
              <thead>
                  <tr>
                    <th class="gallery-table-header">Likes</th>
                    <th class="gallery-table-header">Views</th>
                    <th class="gallery-table-header">Comments</th>
                    <th class="gallery-table-header">Downloads</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                    <td class="gallery-table-cell">${image.likes}</td>
                    <td class="gallery-table-cell">${image.views}</td>
                    <td class="gallery-table-cell">${image.comments}</td>
                    <td class="gallery-table-cell">${image.downloads}</td>
                  </tr>
                </tbody>
              </table>
          </li>
        `
    )
    .join('');

  refs.galleryEl.insertAdjacentHTML('beforeend', markUp);
  lightbox.refresh();
};

export const clearGallery = () => {
  refs.galleryEl.innerHTML = '';
};

export const showLoader = () => {
  refs.loaderEl.classList.add('is-visible');
};

export const hideLoader = () => {
  refs.loaderEl.classList.remove('is-visible');
};

export const showLoadMoreButton = () => {
  refs.loadMoreBtn.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  refs.loadMoreBtn.classList.add('is-hidden');
};
