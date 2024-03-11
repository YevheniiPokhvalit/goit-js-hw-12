export function generateHTML(data) {
  return data.hits
    .map(
      element => `<div class="gallery-item">
      <a class="gallery-link" href="${element.largeImageURL}">
          <img class="gallery-image" src="${element.webformatURL}" alt="${element.tags}">
      </a>
      <div class="gallery-image-info">
          <p class="image-info-item"><span class="image-items-text">Likes: </span>${element.likes}</p>
          <p class="image-info-item"><span class="image-items-text">Views: </span>${element.views}</p>
          <p class="image-info-item"><span class="image-items-text">Comments: </span>${element.comments}</p>
          <p class="image-info-item"><span class="image-items-text">Downloads: </span>${element.downloads}</p>
      </div>
  </div>`
    )
    .join('');
}
