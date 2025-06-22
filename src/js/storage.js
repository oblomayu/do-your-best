const storage = {
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    clear: () => {
        localStorage.clear();
    },
    
    // Task-specific methods
    getTasks: () => {
        return this.get('tasks') || [];
    },
    
    saveTask: (task) => {
        const tasks = this.getTasks();
        tasks.push(task);
        this.set('tasks', tasks);
    },
    
    updateTask: (id, updates) => {
        const tasks = this.getTasks();
        const index = tasks.findIndex(task => task.id === id);
        
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...updates };
            this.set('tasks', tasks);
            return true;
        }
        
        return false;
    },
    
    deleteTask: (id) => {
        const tasks = this.getTasks().filter(task => task.id !== id);
        this.set('tasks', tasks);
    }
};

export { storage };