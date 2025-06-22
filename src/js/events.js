import { elements, navigateTo } from './dom.js';
import { handleLogin } from './auth.js';

// Common Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons
    if (elements.getStartedBtn) {
        elements.getStartedBtn.addEventListener('click', () => {
            navigateTo('login');
        });
    }
    
    if (elements.loginBtn) {
        elements.loginBtn.addEventListener('click', () => {
            navigateTo('login');
        });
    }
    
    if (elements.signupBtn) {
        elements.signupBtn.addEventListener('click', () => {
            navigateTo('signup');
        });
    }

    // Dashboard navigation
    if (elements.dailyPlanner) {
        elements.dailyPlanner.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('dailyDashboard').classList.remove('hidden');
            document.getElementById('monthViewSection').classList.add('hidden');
            elements.dailyPlanner.parentElement.classList.add('active');
            elements.monthView.parentElement.classList.remove('active');
        });
    }

    if (elements.monthView) {
        elements.monthView.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('dailyDashboard').classList.add('hidden');
            document.getElementById('monthViewSection').classList.remove('hidden');
            elements.dailyPlanner.parentElement.classList.remove('active');
            elements.monthView.parentElement.classList.add('active');
        });
    }

    // Manage tasks button
    if (elements.manageTasks) {
        elements.manageTasks.addEventListener('click', () => {
            window.location.href = 'task-manager.html';
        });
    }

    // Login form submission
    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const credentials = {
                username: elements.loginForm.username.value,
                password: elements.loginForm.password.value
            };
            
            if (handleLogin(credentials)) {
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }
});