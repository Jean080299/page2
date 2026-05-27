const habitInput = document.getElementById('habitInput');
const addHabitBtn = document.getElementById('addHabitBtn');
const habitList = document.getElementById('habitList');

const totalHabits = document.getElementById('totalHabits');
const completedHabits = document.getElementById('completedHabits');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveHabits(){
  localStorage.setItem('habits', JSON.stringify(habits));
}

function updateStats(){
  const total = habits.length;
  const completed = habits.filter(h => h.done).length;

  totalHabits.textContent = total;
  completedHabits.textContent = completed;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressFill.style.width = percent + '%';
  progressText.textContent = percent + '% completado';
}

function renderHabits(){
  habitList.innerHTML = '';

  habits.forEach((habit, index) => {
    const li = document.createElement('li');
    li.className = 'habit-item';

    if(habit.done){
      li.classList.add('completed');
    }

    li.innerHTML = `
      <span>${habit.name}</span>
      <button class="complete-btn">
        ${habit.done ? 'Hecho' : 'Completar'}
      </button>
    `;

    li.querySelector('button').addEventListener('click', () => {
      habits[index].done = !habits[index].done;
      saveHabits();
      renderHabits();
    });

    habitList.appendChild(li);
  });

  updateStats();
}

addHabitBtn.addEventListener('click', () => {
  const name = habitInput.value.trim();

  if(name === '') return;

  habits.push({
    name,
    done:false
  });

  habitInput.value = '';

  saveHabits();
  renderHabits();
});

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {

    document.querySelectorAll('.nav-btn')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');

    document.querySelectorAll('.section')
      .forEach(sec => sec.classList.remove('active-section'));

    document.getElementById(btn.dataset.section)
      .classList.add('active-section');
  });
});

renderHabits();
