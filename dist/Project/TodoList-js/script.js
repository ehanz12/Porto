document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const tasksLeftSpan = document.getElementById('tasksLeft');
    const dateElement = document.getElementById('date');
    
    // Display current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render tasks based on filter
    let currentFilter = 'all';
    
    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<p class="no-tasks">No tasks found</p>';
        } else {
            filteredTasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.dataset.id = task.id;
                
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                `;
                
                taskList.appendChild(taskItem);
            });
        }
        
        updateTaskStats();
    }
    
    // Update task statistics (tasks left)
    function updateTaskStats() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksLeftSpan.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'} left`;
    }
    
    // Toggle task completion status
    function toggleTaskCompletion(taskId) {
        tasks = tasks.map(task => {
            if (task.id === Number(taskId)) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasks();
        renderTasks();
    }
    
    // Delete a task
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== Number(taskId));
        saveTasks();
        renderTasks();
    }
    
    // Clear all completed tasks
    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }
    
    // Set active filter
    function setActiveFilter(filter) {
        currentFilter = filter;
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
        renderTasks();
    }
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    taskList.addEventListener('click', function(e) {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = taskItem.dataset.id;
        
        if (e.target.classList.contains('delete-btn') || e.target.classList.contains('fa-trash')) {
            deleteTask(taskId);
        } else if (e.target.classList.contains('task-checkbox')) {
            toggleTaskCompletion(taskId);
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveFilter(button.dataset.filter);
        });
    });
    
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // Initial render
    renderTasks();
});