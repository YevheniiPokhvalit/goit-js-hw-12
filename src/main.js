import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchDataFromAPI } from './js/pixabay-api.js';
import { generateHTML } from './js/render-functions.js';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const searchForm = document.querySelector('#searchForm');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more-btn');
let currentPage = 1;
let totalHits = 0;
let searchQuery = '';

loadMoreButton.style.display = 'none';

// Event listeners
loadMoreButton.addEventListener('click', onLoadMore);
searchForm.addEventListener('submit', onSubmit);
galleryContainer.addEventListener('scroll', smoothScroll);

// User submits the search form
function onSubmit(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  currentPage = 1;
  searchQuery = searchForm.elements.searchQuery.value.trim();
  fetchImages();
}

// User clicks the load more button
function onLoadMore() {
  currentPage++;
  fetchImages();
}

// Fetch images from the API
function fetchImages() {
  fetchDataFromAPI(searchQuery, currentPage)
    .then(data => {
      totalHits = data.totalHits;
      const generatedHTML = generateHTML(data);
      galleryContainer.insertAdjacentHTML('beforeend', generatedHTML);
      lightbox.refresh();
      handleLoadMoreButtonVisibility(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Show or hide the "Load more" button based on the total number of hits and the current number of children in the container
function handleLoadMoreButtonVisibility(data) {
  if (galleryContainer.children.length < totalHits) {
    loadMoreButton.style.display = 'block';
  } else {
    const currentHits = currentPage * 15;
    if (currentHits >= totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: `We're sorry, but you've reached the end of search results.`,
      });
    } else {
      generateHTML(data);
    }
  }
}

// Allows for smooth scrolling within the container
function smoothScroll() {
  const itemHeight =
    galleryContainer.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: 3 * itemHeight,
    behavior: 'smooth',
  });
}
