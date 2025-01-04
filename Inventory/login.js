const users = [
    { username: 'rthomas', password: 'adminpass', role: 'Admin' },
    { username: 'ajackson', password: 'managerpass', role: 'Manager' },
    { username: 'pnelson', password: 'staffpass', role: 'Staff' },
  ]; 
  function handleLogin(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.username === username && user.password === password); 
    if (user) {
      localStorage.setItem('role', user.role); 
      localStorage.setItem('username', user.username); 
      if (user.role === 'Admin') {
        window.location.href = 'admin_dashboard.html';
      } else if (user.role === 'Manager') {
        window.location.href = 'manager_dashboard.html';
      } else if (user.role === 'Staff') {
        window.location.href = 'staff_dashboard.html';
      }
    } else {
      document.getElementById('error-message').style.display = 'block';
    }
  }
  