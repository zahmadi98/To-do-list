document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.nav-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPage = button.getAttribute('data-page');
      window.location.href = targetPage;
    });
  });
});
const mainFab = document.getElementById('mainFab');
const fabOptions = document.getElementById('fabOptions');

mainFab.addEventListener('click', () => {
  if (fabOptions.style.display === 'flex') {
    fabOptions.style.display = 'none';
  } else {
    fabOptions.style.display = 'flex';
  }
});

