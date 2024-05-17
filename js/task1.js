const ul = document.querySelector(".gallery");
let figure = document.querySelector("#original");
const previewList = [];
let imgList = [];

function loadPhotos() {
    fetch("js/gallery.json")
        .then(response => response.json())
        .then(initList)
        .catch(err => console.error(err));
}

function initList(images) {
    imgList = images;
    for (let img of images) {
        let currentLi = document.createElement("li");
        let currentEl = document.createElement("img");
        currentEl.src = img.preview;
        currentEl.alt = img.description;
        currentLi.append(currentEl);
        previewList.push(currentLi);
    }
    ul.append(...previewList);
}

function eventProcessor(event) {
    if (event.target.tagName === 'IMG' && event.target.parentElement.tagName === 'LI') {
        let targetImgIndex = previewList.indexOf(event.target.parentElement);
        if (targetImgIndex >= 0) {
            let originalImg = document.createElement("img");
            originalImg.src = imgList[targetImgIndex].original;
            originalImg.alt = imgList[targetImgIndex].description;

            figure.innerHTML = ''; // Clear the figure content
            figure.appendChild(originalImg);

            lightbox = basicLightbox.create(figure.outerHTML);
            lightbox.show();
        }
    }
}

window.onload = () => {
    loadPhotos();
};

ul.addEventListener("click", eventProcessor);