const ul = document.querySelector(".gallery");
let figure = document.querySelector("#original");
let lightbox;
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

    lightbox = basicLightbox.create(figure)
}

function eventProcessor(event) {
    let targetImg = previewList.indexOf(event.target.parentElement);
    if (targetImg >= 0) {
        let originalImg = document.createElement("img");
        originalImg.src = imgList[targetImg].original;
        originalImg.alt = imgList[targetImg].description;

        figure.replaceChildren(originalImg);

        lightbox = basicLightbox.create(figure);
        lightbox.show();
    }
}

window.onload = () => {
    loadPhotos();
};

window.addEventListener("click", eventProcessor);