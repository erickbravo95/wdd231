const container = document.querySelector('.grid_courses');
const card = document.querySelector('.card3');

// Crear contenedor para los cursos y los créditos
const courseList = document.createElement('div');
courseList.classList.add('course-list');
const creditDisplay = document.createElement('p');
creditDisplay.classList.add('credit-display');

card.appendChild(courseList);
card.appendChild(creditDisplay);

function renderCourses(filteredCourses) {
  courseList.innerHTML = '';
  let totalCredits = 0;

  filteredCourses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.classList.add(course.completed ? 'completed' : 'not-completed');

    courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
    `;

    courseList.appendChild(courseCard);
    totalCredits += course.credits;
  });

  creditDisplay.textContent = `The total credits for course listed above is: ${totalCredits}`;
}

function filterCourses(type) {
  if (type === 'ALL') {
    renderCourses(courses);
  } else {
    const filtered = courses.filter(c => c.subject === type);
    renderCourses(filtered);
  }
}

document.querySelector('.b_all').addEventListener('click', () => filterCourses('ALL'));
document.querySelector('.b_cse').addEventListener('click', () => filterCourses('CSE'));
document.querySelector('.b_wdd').addEventListener('click', () => filterCourses('WDD'));

// Ejecutar al inicio
filterCourses('ALL');
