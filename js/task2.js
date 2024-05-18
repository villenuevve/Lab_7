document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'feedback-form-state';
  const form = document.querySelector('.feedback-form');
  const emailInput = form.elements.email;
  const messageInput = form.elements.message;

  const formData = {
    email: emailInput.value || '',
    message: messageInput.value || ''
  };

  const updateStorage = () => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  };

  const loadFromStorage = () => {
    const data = localStorage.getItem(storageKey);
    if (data) {
      const loadedFormData = JSON.parse(data);
      emailInput.value = loadedFormData.email || '';
      messageInput.value = loadedFormData.message || '';
      formData.email = loadedFormData.email || '';
      formData.message = loadedFormData.message || '';
    }
  };

  const clearStorage = () => {
    localStorage.removeItem(storageKey);
  };

  const validateData = () => {
    return formData.email.trim() && formData.message.trim();
  };

  const trimFields = () => {
    formData.email = formData.email.trim();
    formData.message = formData.message.trim();
  };

  const clearAllFields = () => {
    formData.email = '';
    formData.message = '';
    form.reset();
  };

  emailInput.addEventListener('input', (event) => {
    formData.email = event.target.value;
    updateStorage();
  });

  messageInput.addEventListener('input', (event) => {
    formData.message = event.target.value;
    updateStorage();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateData()) {
      alert('Please fill all fields');
      return;
    }
    trimFields();
    console.log(formData);
    clearStorage();
    clearAllFields();
  });

  loadFromStorage();
});