import images from "./gallery-items.js";

const refs = {
body: document.querySelector('body'),
galleryList: document.querySelector('.js-gallery'),
modalWindow: document.querySelector('.js-lightbox'),
zoomedImage: document.querySelector('.lightbox__image'),
};
const { body, galleryList, modalWindow, zoomedImage } = refs;

createImagesMarkup(images);
galleryList.addEventListener('click', onImageClick);
modalWindow.addEventListener('click', onModalCloseClick);
window.addEventListener('keydown', onModalClosePush);
window.addEventListener('keydown', onModalPrevImgPush);
window.addEventListener('keydown', onModalNextImgPush);

function createImagesMarkup(images) {
    const arrWithMarkup = images.map((image, i) => {
    const galleryItem = document.createElement("li");
     
        galleryItem.classList.add('gallery_item');
        galleryItem.insertAdjacentHTML('afterbegin',
            ` <a
    class="gallery__link"
    href="${image.original}"
  >
    <img
      class="gallery__image"
      src="${image.preview}"
      data-source="${image.original}"
      data-number = ${i}
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
    zoomedImage.dataset.number = evt.target.dataset.number;
    
}

function onModalCloseClick(evt) {
if (!evt.target.classList.contains('lightbox__button')
        &&
        !evt.target.classList.contains('lightbox__overlay')) {
        return;
    }
    
    modalWindow.classList.toggle('is-open');
    body.classList.toggle('is-fixed');
    zoomedImage.alt = '';
    zoomedImage.src = '';
}

function onModalClosePush (evt) {
if (evt.code !== 'Escape') {
        return;
    }
    
    modalWindow.classList.remove('is-open');
    body.classList.remove('is-fixed');
    zoomedImage.alt = '';
    zoomedImage.src = '';
}

function onModalPrevImgPush(evt) {
    const index = zoomedImage.dataset.number;
    const prevImg = document.querySelector(`img[data-number='${index - 1}']`);

   if (evt.code !== 'ArrowLeft') {
        return;
    }
 
    zoomedImage.src = prevImg.dataset.source;
    zoomedImage.alt = prevImg.dataset.source;
    zoomedImage.dataset.number = prevImg.dataset.number;
  


}

function onModalNextImgPush(evt) {
    const index = zoomedImage.dataset.number;
    const nextImg = document.querySelector(`img[data-number='${Number(index) + 1}']`);

   if (evt.code !== 'ArrowRight') {
        return;
    }

    zoomedImage.src = nextImg.dataset.source;
    zoomedImage.alt = nextImg.dataset.source;
    zoomedImage.dataset.number = nextImg.dataset.number;


}