const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable');
let users = JSON.parse(localStorage.getItem('users')) || []; 
userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    if (!username || !email || !role) {
        alert('Please fill all fields!');
        return;
    }
    const editingIndex = document.getElementById('userForm').editingIndex;
    if (editingIndex === undefined) {
        users.push({ username, email, role });
    } else {
        users[editingIndex] = { username, email, role };
        delete document.getElementById('userForm').editingIndex; 
    }

    userForm.reset();
    saveUsersToLocalStorage();
    renderUsers(); 
});

function saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users)); 
}

function renderUsers() {
    userTable.innerHTML = '';

    if (users.length === 0) {
        userTable.innerHTML = '<tr><td colspan="4" style="text-align: center;">No users available</td></tr>';
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}

function editUser(index) {
    const user = users[index];

    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('role').value = user.role;

    document.getElementById('userForm').editingIndex = index;
}

function deleteUser(index) {
    users.splice(index, 1);

    saveUsersToLocalStorage();
    renderUsers();
}

renderUsers();
