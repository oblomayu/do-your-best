import { storage } from './storage.js';
import { elements } from './dom.js';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.init();
    }

    async init() {
        await this.loadTasksFromJSON();
        
        if (elements.taskForm) {
            this.setupTaskForm();
        }

        if (elements.highPriorityTasks) {
            this.renderTasks();
            this.setupTaskEventListeners();
        }
    }

    async loadTasksFromJSON() {
        try {
            const response = await fetch('../data/tasks.json');
            const data = await response.json();
            this.tasks = data.tasks || [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            // Fallback to default tasks if JSON loading fails
            this.tasks = [
                {
                    "id": 1,
                    "title": "Сдать лабораторную работу по алгоритмам",
                    "priority": "high",
                    "dueDate": "2025-06-15",
                    "completed": false
                },
                {
                    "id": 2,
                    "title": "Подготовиться к экзамену по математическому анализу",
                    "priority": "high",
                    "dueDate": "2025-06-18",
                    "completed": false
                },
                {
                    "id": 3,
                    "title": "Изучить React.js для курсового проекта",
                    "priority": "high",
                    "dueDate": "2025-06-20",
                    "completed": false
                },
                {
                    "id": 4,
                    "title": "Сменить график работы в баре на выходные",
                    "priority": "medium",
                    "dueDate": "2025-06-12",
                    "completed": false
                },
                {
                    "id": 5,
                    "title": "Сделать презентацию по базам данных",
                    "priority": "medium",
                    "dueDate": "2025-06-16",
                    "completed": false
                },
                {
                    "id": 6,
                    "title": "Практика по программированию на Python",
                    "priority": "medium",
                    "dueDate": "2025-06-14",
                    "completed": false
                },
                {
                    "id": 7,
                    "title": "Купить учебники на следующий семестр",
                    "priority": "low",
                    "dueDate": "2025-06-25",
                    "completed": false
                },
                {
                    "id": 8,
                    "title": "Обновить резюме для стажировки",
                    "priority": "low",
                    "dueDate": "2025-06-22",
                    "completed": false
                },
                {
                    "id": 9,
                    "title": "Посетить консультацию по курсовой работе",
                    "priority": "low",
                    "dueDate": "2025-06-19",
                    "completed": false
                },
                {
                    "id": 10,
                    "title": "Подготовить отчет по практике",
                    "priority": "low",
                    "dueDate": "2025-06-28",
                    "completed": false
                }
            ];
        }
    }

    setupTaskForm() {
        elements.taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newTask = {
                id: Date.now(),
                title: elements.taskTitle.value,
                priority: elements.taskForm.priority.value,
                dueDate: elements.dueDate.value,
                completed: false
            };
            
            this.tasks.push(newTask);
            storage.set('tasks', this.tasks);
            
            // Redirect to dashboard
            window.location.href = '../dashboard.html';
        });
    }

    renderTasks() {
        // Clear existing tasks
        if (elements.highPriorityTasks) elements.highPriorityTasks.innerHTML = '';
        if (elements.mediumPriorityTasks) elements.mediumPriorityTasks.innerHTML = '';
        if (elements.lowPriorityTasks) elements.lowPriorityTasks.innerHTML = '';

        // Filter tasks by priority
        const highPriority = this.tasks.filter(task => task.priority === 'high');
        const mediumPriority = this.tasks.filter(task => task.priority === 'medium');
        const lowPriority = this.tasks.filter(task => task.priority === 'low');

        // Render tasks
        this.renderTaskList(highPriority, elements.highPriorityTasks);
        this.renderTaskList(mediumPriority, elements.mediumPriorityTasks);
        this.renderTaskList(lowPriority, elements.lowPriorityTasks);
    }

    renderTaskList(tasks, container) {
        if (!container) return;
        
        tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.className = 'task-item';
            taskElement.dataset.id = task.id;
            
            const dueDate = new Date(task.dueDate);
            const formattedDate = dueDate.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit'
            });
            
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.title}</span>
                <span class="task-date">${formattedDate}</span>
            `;
            
            container.appendChild(taskElement);
        });
    }

    setupTaskEventListeners() {
        // Handle task completion
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('task-checkbox')) {
                const taskId = parseInt(e.target.closest('.task-item').dataset.id);
                const task = this.tasks.find(t => t.id === taskId);
                
                if (task) {
                    task.completed = e.target.checked;
                    storage.set('tasks', this.tasks);
                    this.renderTasks(); // Refresh the task list
                }
            }
        });
    }

    getTasksForDate(date) {
        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.toDateString() === date.toDateString();
        });
    }
}

// Initialize task manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

export { TaskManager };