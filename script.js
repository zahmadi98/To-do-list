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
// باز کردن فرم با کلیک روی اولین دکمه (گزینه ۱)
const addTaskPopupBtn = document.querySelectorAll('.fab-option')[0];
const taskPopup = document.getElementById('taskPopup');

addTaskPopupBtn.addEventListener('click', () => {
  taskPopup.style.display = 'flex';
});

// ثبت تسک
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;

  if (!taskText) return;

  const task = {
    text: taskText,
    category: category,
    done: false
  };

  saveTask(task);
  showTask(task); // تو صفحه نشون بده
  taskInput.value = '';
  taskPopup.style.display = 'none';
});

