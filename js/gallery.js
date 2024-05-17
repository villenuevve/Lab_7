let images;
let currentIndex;
let originalImg;
function loadPhotos() {
    fetch("js/gallery.json")
        .then(response => response.json())
        .then(json => {
            images = json
            setCurrentPhoto(0);
        })
        .catch(err => console.error(err));
}

function setCurrentPhoto(index) {
    setPreviewPart(index);
    setOriginalPart(index);
    currentIndex = index;
}

function setPreviewPart(index) {
    let previewImg = document.createElement("img");
    previewImg.src = images[index].preview;
    previewImg.alt = images[index].description;
    document.getElementById("content").querySelector("figure").replaceChildren(previewImg);
}

function setOriginalPart(index) {
    originalImg = document.createElement("img");
    originalImg.src = images[index].original;
    originalImg.alt = images[index].description;

    let figure = document.querySelector("#original");
    figure.replaceChildren(originalImg);

    let lightbox = basicLightbox.create(figure);
    document.querySelector(".frame img").onclick = lightbox.show;
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) >= images.length ? 0 : currentIndex + 1;
    setCurrentPhoto(currentIndex);
}

function previousPhoto() {
    currentIndex = (currentIndex - 1) < 0 ? images.length - 1 : currentIndex - 1;
    setCurrentPhoto(currentIndex);
}

window.onload = () => {
    loadPhotos();
    document.getElementById("left-btn").addEventListener("click", previousPhoto);
    document.getElementById("right-bth").addEventListener("click", nextPhoto);
};
