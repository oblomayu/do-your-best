// DOM Elements
const elements = {
    // Common elements
    getStartedBtn: document.getElementById('getStarted'),
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    signupForm: document.getElementById('signupForm'),
    loginForm: document.getElementById('loginForm'),
    
    // Dashboard elements
    dailyPlanner: document.getElementById('dailyPlanner'),
    monthView: document.getElementById('monthView'),
    manageTasks: document.getElementById('manageTasks'),
    currentDate: document.getElementById('currentDate'),
    
    // Task elements
    highPriorityTasks: document.getElementById('highPriorityTasks'),
    mediumPriorityTasks: document.getElementById('mediumPriorityTasks'),
    lowPriorityTasks: document.getElementById('lowPriorityTasks'),
    
    // Calendar elements
    calendarGrid: document.getElementById('calendarGrid'),
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth'),
    currentMonthYear: document.getElementById('currentMonthYear'),
    
    // Task form elements
    taskForm: document.getElementById('taskForm'),
    taskTitle: document.getElementById('taskTitle'),
    dueDate: document.getElementById('dueDate')
};

// Navigation functions
const navigateTo = (page) => {
    window.location.href = `${page}.html`;
};

// Helper functions
const hideElement = (element) => {
    element.classList.add('hidden');
};

const showElement = (element) => {
    element.classList.remove('hidden');
};

// Export elements and functions
export { elements, navigateTo, hideElement, showElement };