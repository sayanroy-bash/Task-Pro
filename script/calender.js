const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const todayBtn = document.querySelector(".today");
const month = document.querySelector(".month");
const userId = localStorage.getItem('authToken');
const url = `https://array-archers-default-rtdb.firebaseio.com/tasks.json`;
let data;
let taskID;
let tasks = [];
let editIndex = -1;
let task;


if (!userId) {
  window.alert("User not logged in. Please log in first.");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (userId) {
      fetchTasks();
  }
});

const fetchTasks = async () => {
  try {
      const res = await fetch(url);
      if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const user = await res.json();
      if(!user){
          alert("No Tasks left")
      }else{
          data=Object.values(user);
      taskID=Object.keys(user);
      tasks=data.filter((ele)=>{
          return ele.authToken===userId;
      })
      renderCalendar();;
      }
      
  } catch (error) {
      console.error("Error fetching tasks:", error);
  }
};


const renderTaskList = () => {
  const calendarElement = document.getElementById("calendar");
  const daysInMonth = 31; // You can dynamically calculate this based on the month and year if needed

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.className = "day";
    dayCell.innerText = day;

    // Check if any task is due on this day
    const dueTasks = Object.values(tasks).filter(task => {
      const taskDueDate = new Date(task.dueDate);
      return taskDueDate.getDate() === day && taskDueDate.getMonth() === 7; // Month index is 0-based, so August is 7
    });

    if (dueTasks.length > 0) {
      const taskDetails = document.createElement("div");
      taskDetails.className = "task-details";
      dueTasks.forEach(task => {
        const taskInfo = document.createElement("p");
        taskInfo.innerText = `${task.name}: ${task.description}`;
        taskDetails.appendChild(taskInfo);
      });
      dayCell.appendChild(taskDetails);
      dayCell.classList.add("due-task-day"); // Add a specific class for days with tasks
    }

    calendarElement.appendChild(dayCell);
  }
};

// document.addEventListener("DOMContentLoaded", renderCalendar);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

const renderCalendar = () => {
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;
  const dueTasks = tasks.filter(task => {
    const taskDueDate = new Date(task.dueDate);
    return taskDueDate.getMonth() === currentMonth;
});
  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  let days = "";

  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDayDate; i++) {
    let res=dueTasks.filter((ele)=>{
      return new Date(ele.dueDate).getDate()===i;
    })
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      days += `<div class="day today">${i}
        </div>`;
    }if(res.length>0){
      res.forEach((ele)=>{
        days += `<div class="tasks"><p>${ele.name}</p><p>${i}</p></div>`;
      })
    } else {
      days += `<div class="day">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  hideTodayBtn();
};

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

todayBtn.addEventListener("click", () => {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  renderCalendar();
});

function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = "none";
  } else {
    todayBtn.style.display = "flex";
  }
}


