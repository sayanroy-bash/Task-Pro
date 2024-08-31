const taskForm = document.getElementById('task-form');
const generateDataBtn = document.getElementById('generate-data');
const filterStatus = document.getElementById('filter-status');
const pendingTasksList = document.getElementById('pending-tasks-list');
const inProgressTasksList = document.getElementById('in-progress-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');
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

document.addEventListener('DOMContentLoaded', () => {
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
        renderTaskList();
        }
        
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};


const updateTasks = async () => {
    try {
        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ tasks })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (error) {
        console.error("Error updating tasks:", error);
    }
};

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;
    const dueDate = document.getElementById('due-date').value;
    const importance = document.getElementById('importance').value;
    const urgency = document.getElementById('urgency').value;
    const status = document.getElementById('status').value;

    task = {
        name: taskName,
        description: taskDescription,
        dueDate: dueDate,
        importance: importance,
        urgency: urgency,
        status: status,
        priority: calculatePriority(importance, urgency),
        authToken:userId
    };

    if (editIndex === -1) {
        await addTask(task);
    } else {
        await updateTask(task);
        editIndex = -1;
    }

    taskForm.reset();
    fetchTasks();
});

const addTask = async (task) => {
    try {
        
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
};

const updateTask = async (task) => {
    try {
        let id=taskID[editIndex];
        const res = await fetch(`https://array-archers-default-rtdb.firebaseio.com/tasks/${id}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

const deleteTask = async (index) => {
    try {
        let id=taskID[index];
        const res = await fetch(`https://array-archers-default-rtdb.firebaseio.com/tasks/${id}.json`, {
            method: "DELETE",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        fetchTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

function calculatePriority(importance, urgency) {
    const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
    return priorityOrder[importance] + priorityOrder[urgency];
}

function renderTaskList(){
    let tbody=document.querySelector("tbody");
    tbody.innerHTML="";

    tasks.forEach((ele,index)=>{
        let tr=document.createElement("tr");
        let serial=document.createElement("td");
        let name=document.createElement("td");
        let desc=document.createElement("td");
        let status=document.createElement("td");
        let date=document.createElement("td");
        let priority=document.createElement("td");
        let edit=document.createElement("button");
        let dlt=document.createElement("button");

        serial.innerText=index+1;
        name.innerText=ele.name;
        desc.innerText=ele.description;
        status.innerText=ele.status;
        date.innerText=ele.dueDate;
        priority.innerText=ele.priority;
        edit.innerText="Edit";
        // edit.onclick=
        dlt.innerText="Delete";
        dlt.onclick=()=>deleteTask(index);

        tr.append(serial,name,desc,status,date,priority,edit,dlt);
        tbody.append(tr);
    })
}

//QASDFGHJKL;'/

const showDialogBtn = document.getElementById('showDialogBtn');
const favDialog = document.getElementById('favDialog');
const closeSubmit = document.getElementById('submit')

showDialogBtn.addEventListener('click', () => favDialog.showModal());

closeSubmit.addEventListener("click", () => {
    favDialog.close();
  });