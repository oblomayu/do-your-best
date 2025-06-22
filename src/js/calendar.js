import { storage } from './storage.js';
import { elements } from './dom.js';

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.tasks = [];
        this.init();
    }

    async init() {
        await this.loadTasks();
        
        if (elements.currentDate) {
            this.updateCurrentDateDisplay();
        }

        if (elements.calendarGrid) {
            this.renderCalendar();
            this.setupEventListeners();
        }
    }

    async loadTasks() {
        try {
            const response = await fetch('../data/tasks.json');
            const data = await response.json();
            this.tasks = data.tasks || [];
        } catch (error) {
            console.error('Error loading tasks for calendar:', error);
            this.tasks = [];
        }
    }

    updateCurrentDateDisplay() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const currentDate = new Date();
        elements.currentDate.textContent = currentDate.toLocaleDateString('ru-RU', options);
    }

    renderCalendar() {
        // Clear previous calendar
        elements.calendarGrid.innerHTML = '';

        // Set month and year in header
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        elements.currentMonthYear.textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;

        // Get first day of month and total days in month
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();

        // Create day headers
        const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-header';
            dayElement.textContent = day;
            elements.calendarGrid.appendChild(dayElement);
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay.getDay(); i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            elements.calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = i;
            dayElement.appendChild(dayNumber);
            
            // Highlight today
            if (i === today.getDate() && 
                this.currentDate.getMonth() === today.getMonth() && 
                this.currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }

            // Add tasks for this day
            const dayTasks = this.getTasksForDay(i);
            if (dayTasks.length > 0) {
                const tasksContainer = document.createElement('div');
                tasksContainer.className = 'day-tasks';
                
                dayTasks.forEach(task => {
                    const taskDot = document.createElement('div');
                    taskDot.className = `task-dot ${task.priority}-priority`;
                    taskDot.title = task.title;
                    tasksContainer.appendChild(taskDot);
                });
                
                dayElement.appendChild(tasksContainer);
            }

            elements.calendarGrid.appendChild(dayElement);
        }
    }

    getTasksForDay(day) {
        return this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate.getDate() === day && 
                   taskDate.getMonth() === this.currentDate.getMonth() && 
                   taskDate.getFullYear() === this.currentDate.getFullYear();
        });
    }

    setupEventListeners() {
        if (elements.prevMonth) {
            elements.prevMonth.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                this.renderCalendar();
            });
        }

        if (elements.nextMonth) {
            elements.nextMonth.addEventListener('click', () => {
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                this.renderCalendar();
            });
        }
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (elements.calendarGrid) {
        new Calendar();
    }
});

// Navigation between sections
document.addEventListener('DOMContentLoaded', () => {
    const dailyPlannerLink = document.getElementById('dailyPlanner');
    const monthViewLink = document.getElementById('monthView');
    const dailyDashboard = document.getElementById('dailyDashboard');
    const monthViewSection = document.getElementById('monthViewSection');
    
    if (dailyPlannerLink) {
        dailyPlannerLink.addEventListener('click', (e) => {
            e.preventDefault();
            dailyDashboard.classList.remove('hidden');
            monthViewSection.classList.add('hidden');
            
            // Update active state
            document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
            dailyPlannerLink.closest('li').classList.add('active');
        });
    }
    
    if (monthViewLink) {
        monthViewLink.addEventListener('click', (e) => {
            e.preventDefault();
            dailyDashboard.classList.add('hidden');
            monthViewSection.classList.remove('hidden');
            
            // Update active state
            document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
            monthViewLink.closest('li').classList.add('active');
        });
    }
});

export { Calendar };