document.addEventListener('DOMContentLoaded', () => {
    const ul = document.querySelector('.gallery');
    const figure = document.querySelector('#original');
    let imgList = [];

    const loadPhotos = async () => {
    try {
        const response = await fetch('js/gallery.json');
        const images = await response.json();
        initList(images);
    } catch (err) {
        console.error('Error loading photos:', err);
    }
    };

    const initList = (images) => {
    imgList = images;
    const previewList = images.map((img) => {
        const currentLi = document.createElement('li');
        const currentEl = document.createElement('img');
        currentEl.src = img.preview;
        currentEl.alt = img.description;
        currentLi.append(currentEl);
        return currentLi;
    });
    ul.append(...previewList);
    };

    const eventProcessor = (event) => {
    if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'LI') {
        const targetImgIndex = [...ul.children].indexOf(event.target.parentElement);
        if (targetImgIndex >= 0) {
            const { original, description } = imgList[targetImgIndex];
            const originalImg = document.createElement('img');
            originalImg.src = original;
            originalImg.alt = description;
            figure.innerHTML = ''; 
            figure.appendChild(originalImg);
            const lightbox = basicLightbox.create(figure.outerHTML);
            lightbox.show();
        }
    }
};

    loadPhotos();
    ul.addEventListener('click', eventProcessor);
    });
