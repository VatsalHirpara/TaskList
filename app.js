const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

loadEventListener();

function loadEventListener(){
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit',addTask)
    taskList.addEventListener('click',removeTask);
    clearBtn.addEventListener('click',clearTask);
    filter.addEventListener('keyup',filterTask)
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];

    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li=document.createElement('li');
        li.className='collection-item';
        li.appendChild(document.createTextNode(task));
        const link =document.createElement('a');
        link.className='delete-item secondary-content';
        link.innerHTML='<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e){
    if(taskInput.value=== ''){
        alert('Please add task, task can not be empty');
        return;
    }

    const li=document.createElement('li');
    li.className='collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link =document.createElement('a');
    link.className='delete-item secondary-content';
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

    storeInLocalStorage(taskInput.value);

    taskInput.value=''

    e.preventDefault();
}   

function storeInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}


function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?'))  e.target.parentElement.parentElement.remove();    
        removeFromLocalStorage( e.target.parentElement.parentElement);
    }
}

function removeFromLocalStorage(taskitem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskitem.textContent=== task){
            tasks.splice(index,1);
        } 
    });

    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function clearTask(e){
    taskList.innerHTML=''; 
    clearFromLocalStorage();
}

function clearFromLocalStorage(){
    localStorage.clear();
}

function filterTask(e){
    const text=e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item =task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1) task.style.display='block';
        else task.style.display='none';
    });
}