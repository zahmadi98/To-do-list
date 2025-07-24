document.addEventListener('DOMContentLoaded', () => {
  // دکمه‌های ناوبری هدر
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPage = button.getAttribute('data-page');
      window.location.href = targetPage;
    });
  });

  // FAB دکمه + و باز و بسته کردن
  const mainFab = document.getElementById('mainFab');
  const fabOptions = document.getElementById('fabOptions');

  mainFab.addEventListener('click', () => {
    fabOptions.style.display = (fabOptions.style.display === 'flex') ? 'none' : 'flex';
  });

  // باز کردن فرم تسک با کلیک روی دکمه اول
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

    showTask(task);
    taskInput.value = '';
    taskPopup.style.display = 'none';
  });

  function showTask(task) {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';
    taskBox.innerHTML = `
      <input type="checkbox" class="task-done">
      <span>${task.text}</span>
      <button class="delete-task">🗑</button>
    `;
    document.getElementById('taskContainer').appendChild(taskBox);

    taskBox.querySelector('.delete-task').addEventListener('click', () => {
      taskBox.remove();
    });

    taskBox.querySelector('.task-done').addEventListener('change', e => {
      const span = taskBox.querySelector('span');
      if (e.target.checked) {
        taskBox.style.opacity = '0.5';
        span.style.textDecoration = 'line-through';
      } else {
        taskBox.style.opacity = '1';
        span.style.textDecoration = 'none';
      }
    });
  }
});
