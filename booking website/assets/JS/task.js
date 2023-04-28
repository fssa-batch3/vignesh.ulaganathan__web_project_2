let taskinput = document.getElementById("add-task");
let addbtn = document.getElementById("addbtn");
let tasklist = document.getElementById("tasklist");
let suggestiontask = document.querySelector("#suggestionlist")




// Display today date, day and month
let day = document.querySelector(".day")
let date = document.querySelector(".date");
let month = document.querySelector(".month");
let currentDate = Date();
day.innerText = currentDate.slice(0,4);
date.innerText = currentDate.slice(8,10);
month.innerText = currentDate.slice(4,7);



// add and save task in local storage
let existingtask = JSON.parse(localStorage.getItem("usertasks")) ?? [];
existingtask.forEach(task => rendertask(task))

// add task function
function addtask() {
    let newtask = { 
        taskId: Math.floor(Math.random() * Date.now()),
        taskname: taskinput.value,
        createddate: Date().slice(4,16),
        createdtime: Date().slice(16, 25),
        duedate : "",
        duetime : "",
        priority: "",
        notes : "",
        subtask : "",
        attachment : "",
        status: "not completed"
    };
    existingtask.push(newtask);
    localStorage.setItem("usertasks", JSON.stringify(existingtask));
    Notify.success(`${taskinput.value} Task Added`);
    rendertask(newtask);
    taskinput.value = ""
}



// render task in local storage function
function rendertask(task) {
    let li = document.createElement('li')
    let indexStatus = existingtask.findIndex(t => t.taskname == task.taskname)
    if(existingtask[indexStatus]["status"] == "completed"){
    li.innerHTML = `<span id="taskspan" onclick="popup()">
                    <span id="taskHeading"> <s>${task.taskname}</s></span>
                    <span id="todosdescrip">Project Description</span>
                    </span>
                    <button id="checkmark" >&#10004;</button>
                    <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
                    `
    }
    else{
        li.innerHTML = `<span id="taskspan" onclick="popup()">
                        <span id="taskHeading">${task.taskname}</span>
                        <span id="todosdescrip">Project Description</span>
                        </span>
                    
                    <button id="checkmark" >&#10004;</button>
                    <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>
                    `
    }
    li.querySelector('#checkmark').addEventListener('click', () => {
        let indexDone = existingtask.findIndex(t => t.taskname == task.taskname)
        li.innerHTML = `<span id="taskspan" onclick="popup()">
                        <span id="taskHeading"> <s>${task.taskname}</s></span>
                        <span id="todosdescrip">Project Description</span>
                        </span>
                        <button id="checkmark" >&#10004;</button>
                        <button id="deletebtn"><i class='fas fa-trash' style='color:white'></i></button>`
        existingtask[indexDone]["status"] = "completed"
        localStorage.setItem("usertasks", JSON.stringify(existingtask));
        Notify.success(`${task.taskname} Task Completed`)
        
    });
    li.querySelector('#deletebtn').addEventListener('click', () => {
        let indexDel = existingtask.findIndex(t => t.taskname == task.taskname)
        existingtask.splice(indexDel, 1)
        localStorage.setItem("usertasks", JSON.stringify(existingtask));
        Notify.error(`${task.taskname} Task Removed`)
        li.remove()
        
    });
    tasklist.append(li)
    
}





// Task Details
let taskTitle = document.getElementById("taskName");
let taskspanlist = document.querySelectorAll("li");
taskspanlist.forEach((task,index) => {
    task.onclick = ()=>{
        let clickedTask = task.querySelector('#taskHeading').textContent;
        taskTitle.innerText = clickedTask;

        // get value from dues and save in local storage
        savedues(index)

        // get value from local storage and display it in value task details
        displaydues(index)

        subtask(index)

        rendertask(task)
    }
})


let dueTime = document.getElementById("duetime");
let dueDate = document.getElementById("duedate");
let PriorityTask = document.getElementById("Priority");
function savedues(index) {
     // setting duetime in local storage
     dueTime.onchange = () => {
         existingtask[index]["duetime"] = dueTime.value;
         localStorage.setItem("usertasks", JSON.stringify(existingtask));
         alert("Duetime Changed")
     }

     // setting duedate in local storage
     dueDate.onchange = () => {
         existingtask[index]["duedate"] = dueDate.value;
         localStorage.setItem("usertasks", JSON.stringify(existingtask));
         alert("DueDate Changed")
     }

     // setting priority in local storage
     PriorityTask.onchange = () => {
         existingtask[index]["priority"] = PriorityTask.value;
         localStorage.setItem("usertasks", JSON.stringify(existingtask));
         alert("priority Changed")
     }
}

function displaydues(index) {
    // Display current or saved time in task details
    let currentTime = Date().slice(16, 21);
    if(existingtask[index]["duetime"] == ""){
        dueTime.value = currentTime;
    }
    else{
        dueTime.value = existingtask[index]["duetime"]
    }
    

    // Display current date in task details
    if(existingtask[index]["duedate"] == ""){
        dueDate.value = new Date().toJSON().slice(0, 10)
    }
    else{
        dueDate.value = existingtask[index]["duedate"];
    }

    // Display Priority
    if(existingtask[index]["priority"] != ""){
        PriorityTask.value = existingtask[index]["priority"];
    }
}


let subTaskCheck = document.getElementById("subtaskcheck");
let subTask = document.getElementById('subtask');
function subtask(index) {
    subTask.onchange = () =>{
        let existingsubtask = existingtask[index].subtask == "" ? [] : existingtask[index].subtask;
        let newsubtask = {
            task: subTask.value,
            status: subTaskCheck.checked ? "done" : "not done"
        };
        existingsubtask.push(newsubtask);
        existingtask[index].subtask = existingsubtask;
        localStorage.setItem("usertasks", JSON.stringify(existingtask));
        alert("subtask added");
        rendersubtask(newsubtask)
    }
}



function rendersubtask(){
    const subtaskDiv = document.querySelector('.subtask');


    existingtask.forEach(item => {
        item.subtask.forEach(task => {
          const taskli = document.createElement('li');
          taskli.innerHTML = `<input type="checkbox" id="subtaskstatus">
                              <label id="subtaskstatus">${task.task}</label>`
                              
            subtaskDiv.append(taskli)
        });
      });
}

// if taskinput is empty or space, task should not be added
addbtn.onclick = () => {
    if(taskinput.value.trim() != ""){
        addtask();
    }
    else{
        Notify.error(`Type Any Task Name`)
    }
}

// function for add task when enter press key is pressed
taskinput.addEventListener('keypress',e =>{
    
        if (e.key === 'Enter') {
            if(taskinput.value != ""){
                addtask();
            }
            else{
                Notify.error(`Type Any Task Name`)
            }
        }
    
}); 





// function for pop up window
let taskDetails = document.querySelector(".taskDetails");
function popup() {
    taskDetails.style.display = "block";
    
}


// function for close pop up window
let close = document.getElementById("close")
close.onclick = function() {
    taskDetails.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
let taskPage = document.querySelector(".task-page")
window.onclick = function (event) {
    if (event.target == taskPage) {
        taskDetails.style.display = "none";
    }
}




// Digital Clock
// let digitaltime = document.getElementById("digitaltime")
// let thishour = displayClock().slice(16,21);
// window.onload = displayClock();
// function displayClock(){
//     let display = Date();
//     document.querySelector("#digitaltime").innerHTML = display.slice(16,25);
//     setTimeout(displayClock, 1000); 
//     return display
// }
// digitaltime.style.display = "none";


// Task suggestion

// function tasksuggestion(task) {
//     if(thishour == "20:40" && task.status == "not completed" && (task.loc == "myday" || task.loc == "suggestion")){
//         let indexlocation = existingtask.findIndex(t => t.taskId == task.taskId)
//         existingtask[indexlocation]["loc"] = "suggestion";
//         let weekday = "Yesterday";
//         let li = document.createElement('li')
//         li.innerHTML = `<span id="suggestionspan"><i class="fa fa-plus"></i> ${task.todos}</span> <br> <br>
//                         <span id="sugduedate">From ${weekday}</span>
//                         `

//         suggestiontask.append(li)
//         tasklist.remove(li)
//         localStorage.setItem("usertasks", JSON.stringify(existingtask));
//     }
// }

// let j = 0;
// for(let i = 0; i < existingtask.length; i++){
//     if(existingtask[i]["loc"] == "myday")
//         j = 1;
//     else if(existingtask[i]["loc"] == "suggestion"){
//         j = 0;
//     }
// }
// if(j == 1){
//     existingtask.forEach(task => rendertask(task))
// }
// else{
//     existingtask.forEach(task => tasksuggestion(task))
// }


// let arrowicon = document.getElementById("arrow");
// let bulbicon = document.getElementById("bulb");
// let suggestions = document.querySelector(".suggestiontask")

// arrowicon.style.display = "none";
// bulbicon.style.display = "block";
// suggestions.style.display = "none"

// bulbicon.onclick = ()=>{
//     arrowicon.style.display = "block";
//     bulbicon.style.display = "none";
//     suggestions.style.display = "block"
    
// }
// arrowicon.onclick = ()=>{
//     arrowicon.style.display = "none";
//     bulbicon.style.display = "block";
//     suggestions.style.display = "none"
// }

// let subTaskBtn = document.getElementById("subtaskbtn");
// subTaskBtn.onclick = () =>{
//     // Get the subtask div
//     const subtaskDiv = document.querySelector(".subtask");

//     // Create the input elements
//     const checkboxInput = document.createElement("input");
//     checkboxInput.type = "checkbox";
//     checkboxInput.id = "subtaskcheck";

//     const textInput = document.createElement("input");
//     textInput.type = "text";
//     textInput.setAttribute("for", "subtaskcheck");
//     textInput.id = "subtask";
//     textInput.placeholder = "Add Task Sub";

//     // Append the input elements to the subtask div
//     subtaskDiv.appendChild(checkboxInput);
//     subtaskDiv.appendChild(textInput);

// }