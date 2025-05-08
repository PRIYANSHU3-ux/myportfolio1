// Admin Authentication
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Handle Login
if (document.getElementById('login-form')) {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            localStorage.setItem('adminAuthenticated', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Check Authentication
function checkAuth() {
    if (!localStorage.getItem('adminAuthenticated')) {
        window.location.href = 'login.html';
    }
}

// Dashboard Functionality
if (document.querySelector('.admin-dashboard')) {
    checkAuth();

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('adminAuthenticated');
        window.location.href = 'login.html';
    });

    // Tab Switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Project Management
    const projectsList = document.getElementById('projects-list');
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectModal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const projectForm = document.getElementById('project-form');

    // Load Projects
    function loadProjects() {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projectsList.innerHTML = projects.map((project, index) => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.category}</p>
                    <div class="project-actions">
                        <button class="btn secondary" onclick="deleteProject(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Add Project
    addProjectBtn.addEventListener('click', () => {
        projectModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const category = document.getElementById('project-category').value;
        const imageFile = document.getElementById('project-image').files[0];

        const reader = new FileReader();
        reader.onload = function(e) {
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            projects.push({
                title,
                category,
                image: e.target.result
            });
            localStorage.setItem('projects', JSON.stringify(projects));
            loadProjects();
            projectModal.classList.remove('active');
            projectForm.reset();
        };
        reader.readAsDataURL(imageFile);
    });

    // Delete Project
    window.deleteProject = function(index) {
        if (confirm('Are you sure you want to delete this project?')) {
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            projects.splice(index, 1);
            localStorage.setItem('projects', JSON.stringify(projects));
            loadProjects();
        }
    };

    // Message Management
    const messagesList = document.getElementById('messages-list');

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messagesList.innerHTML = messages.map((message, index) => `
            <div class="message-card">
                <div class="message-header">
                    <h3>${message.name}</h3>
                    <span class="message-date">${new Date(message.date).toLocaleString()}</span>
                </div>
                <p><strong>Email:</strong> ${message.email}</p>
                <p>${message.message}</p>
                <button class="btn secondary" onclick="deleteMessage(${index})">Delete</button>
            </div>
        `).join('');
    }

    // Delete Message
    window.deleteMessage = function(index) {
        if (confirm('Are you sure you want to delete this message?')) {
            const messages = JSON.parse(localStorage.getItem('messages') || '[]');
            messages.splice(index, 1);
            localStorage.setItem('messages', JSON.stringify(messages));
            loadMessages();
        }
    };

    // Initial Load
    loadProjects();
    loadMessages();
}
