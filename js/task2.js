document.addEventListener('DOMContentLoaded', () => {
  const storageKey = 'feedback-form-state';
  const form = document.querySelector('.feedback-form');
  const { email: emailInput, message: messageInput } = form.elements;

  const formData = {
    email: emailInput.value || '',
    message: messageInput.value || ''
  };

  const updateStorage = () => localStorage.setItem(storageKey, JSON.stringify(formData));

  const loadFromStorage = () => {
    const data = localStorage.getItem(storageKey);
    if (data) {
      const { email = '', message = '' } = JSON.parse(data);
      emailInput.value = email;
      messageInput.value = message;
      Object.assign(formData, { email, message });
    }
  };

  const clearStorage = () => localStorage.removeItem(storageKey);

  const validateData = () => formData.email.trim() && formData.message.trim();

  const trimFields = () => {
    formData.email = formData.email.trim();
    formData.message = formData.message.trim();
  };

  const clearAllFields = () => {
    Object.assign(formData, { email: '', message: '' });
    form.reset();
  };

  const handleInput = ({ target: { name, value } }) => {
    formData[name] = value;
    updateStorage();
  };

  emailInput.addEventListener('input', handleInput);
  messageInput.addEventListener('input', handleInput);

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
