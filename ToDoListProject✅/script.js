let listTasks = JSON.parse(localStorage.getItem("tasks")) || {};
let currentTask = document.querySelector('.task-input');
let buttonElement = document.querySelector('.add-btn');

buttonElement.addEventListener('click', addTask);

let htmlDisplay = ''    

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(listTasks));
}

function addTask() {
    listTasks[currentTask.value] = false;
    displayTask();
    saveTasks();
    currentTask.value = '';
};

function displayTask() {
    htmlDisplay = '';
    for (let task in listTasks) {
        let html =`
        <div class="task-container">

            <div>
                <button class="checker-btn" onclick="TaskDone('${task}', this)">
                <img class="current-img" src="unchecked.png"/>
                </button>
            </div>

            <div class="current-task"><p class="text-decor">${task}</p></div>

            <div>
                <button class="js-delete-btn" 
                onclick="removeTask('${task}');" //I solved This but WTF!?
                >x</button>
            </div>
        
        </div>
        `;
        htmlDisplay += html;
    }
     document.querySelector('.output-display')
    .innerHTML = htmlDisplay;   
}
    

function removeTask(curr_task) {
    delete listTasks[curr_task];
    displayTask();
    saveTasks();
}

function TaskDone(truth_value, btnElement) {
    let taskContainer = btnElement.closest('.task-container');
    let img = taskContainer.querySelector('.current-img');
    let texting = taskContainer.querySelector('.text-decor');
    
    if (listTasks[truth_value] === true) {
        img.src = "unchecked.png"
        texting.style.textDecoration = "none"
        listTasks[truth_value] = false;
    } else {
        img.src = "checked.png";
        texting.style.textDecoration = "line-through";
        listTasks[truth_value] = true;
    }
    saveTasks();
}

displayTask();
