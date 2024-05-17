const storage = window.localStorage;

const formData = {
  email: "",
  message: ""
};

const form = document.querySelector(".feedback-form");

form.elements.email.addEventListener("input", (event) => {
  formData.email = event.target.value;
  updateStorage();
});

form.elements.message.addEventListener("input", (event) => {
  formData.message = event.target.value;
  updateStorage();
});

function updateStorage() {
  storage.setItem("feedback-form-state", JSON.stringify(formData));
}

form.addEventListener("submit", processData);

function processData(event) {
  event.preventDefault();
  if (!validateData()) {
    alert("Please fill all fields");
    return;
  }

  trimFields();
  console.log(formData);
  clearStorage();
  clearAllFields();
}

function validateData() {
  return formData.email.trim() && formData.message.trim();
}

function trimFields() {
  formData.email = formData.email.trim();
  formData.message = formData.message.trim();
}

function clearStorage() {
  storage.removeItem("feedback-form-state");
}

function loadFromStorage() {
  let data = storage.getItem("feedback-form-state");
  if (data) {
    let loadedFormData = JSON.parse(data);
    form.elements.email.value = loadedFormData.email || '';
    form.elements.message.value = loadedFormData.message || '';
    formData.email = loadedFormData.email || '';
    formData.message = loadedFormData.message || '';
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