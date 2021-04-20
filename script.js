import images from "./gallery-items.js";

const refs = {
body: document.querySelector('body'),
galleryList: document.querySelector('.js-gallery'),
modalWindow: document.querySelector('.js-lightbox'),
modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
zoomedImage: document.querySelector('.lightbox__image'),
};
const { body, galleryList, modalWindow, modalCloseBtn, zoomedImage } = refs;

createImagesMarkup(images);
galleryList.addEventListener('click', onImageClick);
modalCloseBtn.addEventListener('click', onModalCloseButtonClick);

function createImagesMarkup(images) {
    const arrWithMarkup = images.map(image => {
    const galleryItem = document.createElement("li");
     
        galleryItem.classList.add('gallery_item')
        galleryItem.insertAdjacentHTML('afterbegin',
            ` <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      alt="${image.description}"
    />
  </a>`);
        
        return galleryItem;
        
    });
    
    return galleryList.append(...arrWithMarkup);
}

function onImageClick(evt) {
   evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }

    modalWindow.classList.toggle('is-open');
    body.classList.toggle('is-fixed');
    zoomedImage.src = evt.target.dataset.source;
    zoomedImage.alt = evt.target.dataset.source;
    
}

function onModalCloseButtonClick() {
    modalWindow.classList.toggle('is-open');
    body.classList.toggle('is-fixed');
    zoomedImage.alt = '';
    zoomedImage.src = '';
}

