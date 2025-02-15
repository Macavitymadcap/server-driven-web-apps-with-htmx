const optimisticLike = event => {
  const td = event.target;
  td.textContent = '🩷';
};

const confirm = event => {
  event.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'Confirm Action',
    text: 'Are you sure you want to do this?',
    showCancelButton: true,
    confirmButtonText: 'Yes, do it!',
    cancelButtonText: 'No way!',
  }).then(result => {
    if (result.isConfirmed) {
      event.detail.issueRequest(true);
    }
  });
};

const interceptRequest = event => {
  const textContent = event.detail.elt.textContent;
  if (/Request [12]/.test(textContent)) {
    event.detail.headers['X-Token'] = 'my-token';
  }
};
window.onload = () => {
  const loadButton = document.getElementById('thing-button');
  loadButton.addEventListener('htmx:confirm', confirm);

  document.body.addEventListener('htmx:configRequest', interceptRequest);
};
