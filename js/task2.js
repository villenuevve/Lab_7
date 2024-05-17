const storage = window.localStorage;

const formData = {
  email: "",
  message: ""
};

const form = document.querySelector(".feedback-form");

form.elements.email.addEventListener("input", (event) => {
  formData.email = event.target.value;
  resetFieldInSavedObject("email");
});

form.elements.message.addEventListener("input", (event) => {
  formData.message = event.target.value;
  resetFieldInSavedObject("message");
});

function resetFieldInSavedObject(fieldName) {
  let data = storage.getItem("feedback-form-state");
  if (data) {
    let savedFormData = JSON.parse(data);
    savedFormData[fieldName] = "";
    storage.setItem("feedback-form-state", JSON.stringify(savedFormData));
  }
}

form.addEventListener("submit", processData)
function processData(event) {
  event.preventDefault();
  if (!validateData()) {
    alert("Fill please all fields");
    return;
  }

  trimFields();

  console.log(formData);
  saveToStorage();
  clearAllFields();
}

function validateData() {
  return formData.email ? !!formData.message : false;
}

function trimFields() {
  formData.email = formData.email.trim();
  formData.message = formData.message.trim();
}

function saveToStorage() {
  storage.setItem("feedback-form-state", JSON.stringify(formData));
}

function loadFromStorage() {
  let data = storage.getItem("feedback-form-state");
  if (data) {
    let loadedFormData = JSON.parse(data);

    form.elements.email.value = loadedFormData.email;
    form.elements.message.value = loadedFormData.message;

    formData.email = loadedFormData.email;
    formData.message = loadedFormData.message;
  }
}

window.onload = () => {
  loadFromStorage();
};

function clearAllFields() {
  formData.email = "";
  formData.message = "";
  form.reset();
}