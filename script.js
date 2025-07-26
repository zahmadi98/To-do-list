document.addEventListener('DOMContentLoaded', () => {
  // دکمه‌های هدر برای سوئیچ بین صفحات
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPage = button.getAttribute('data-page');
      window.location.href = targetPage;
    });
  });

  // باز و بسته کردن دکمه‌های شناور
  const mainFab = document.getElementById('mainFab');
  const fabOptions = document.getElementById('fabOptions');
  mainFab.addEventListener('click', () => {
    fabOptions.style.display = fabOptions.style.display === 'flex' ? 'none' : 'flex';
  });

  // باز کردن فرم افزودن تسک
  const addTaskPopupBtn = document.getElementById('addTaskBtnFab');
  const taskPopup = document.getElementById('taskPopup');
  addTaskPopupBtn.addEventListener('click', () => {
    taskPopup.style.display = 'flex';
    fabOptions.style.display = 'none';
  });

  // ثبت تسک
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskInput = document.getElementById('taskInput');
  const categorySelect = document.getElementById('categorySelect');
  const taskContainer = document.getElementById('taskContainer');

  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const category = categorySelect.value;
    if (!taskText) return;

    const task = {
      text: taskText,
      category,
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
    taskContainer.appendChild(taskBox);

    taskBox.querySelector('.delete-task').addEventListener('click', () => {
      taskBox.remove();
    });

    taskBox.querySelector('.task-done').addEventListener('change', e => {
      const span = taskBox.querySelector('span');
      taskBox.style.opacity = e.target.checked ? '0.5' : '1';
      span.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    });
  }

  // 💡 یادآور

  const reminderBtnFab = document.getElementById('reminderBtnFab');
  const reminderPopup = document.getElementById('reminderPopup');
  const reminderDatetime = document.getElementById('reminderDatetime');
  const setReminderBtn = document.getElementById('setReminderBtn');
  const reminderContainer = document.getElementById('taskContainer'); // نمایش کنار تسک‌ها

  reminderBtnFab.addEventListener('click', () => {
    reminderPopup.style.display = 'flex';
    fabOptions.style.display = 'none';
  });

  setReminderBtn.addEventListener('click', () => {
    const datetime = reminderDatetime.value;
    if (!datetime) {
      alert("لطفاً زمان را وارد کنید.");
      return;
    }

    const reminderTime = new Date(datetime).getTime();
    const now = Date.now();
    const delay = reminderTime - now;

    if (delay <= 0) {
      alert("زمان باید در آینده باشد.");
      return;
    }

    const reminderId = Date.now();

    // نمایش یادآور
    const reminderBox = document.createElement('div');
    reminderBox.className = 'reminder-box';
    reminderBox.innerHTML = `
      <span>🔔 Reminder at: ${new Date(reminderTime).toLocaleString()}</span>
      <button class="delete-reminder">🗑</button>
    `;
    reminderBox.dataset.id = reminderId;
    reminderContainer.appendChild(reminderBox);

    // حذف
    reminderBox.querySelector('.delete-reminder').addEventListener('click', () => {
      clearTimeout(window[`reminderTimeout_${reminderId}`]);
      reminderBox.remove();
    });

    // آلارم در زمان مقرر
    window[`reminderTimeout_${reminderId}`] = setTimeout(() => {
      alert("⏰ Reminder Time!");
      // document.getElementById('alarmSound').play(); ← اگر صدای زنگ بذاری
    }, delay);

    reminderDatetime.value = '';
    reminderPopup.style.display = 'none';

    document.getElementById('alarmSound').play();
  });
});

