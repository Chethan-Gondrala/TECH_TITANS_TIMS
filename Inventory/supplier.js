const supplierForm = document.getElementById('supplierForm');
const supplierTable = document.getElementById('supplierTable');
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
let editingIndex = null;

supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('supplierName').value.trim();
    const email = document.getElementById('supplierEmail').value.trim();
    const phone = document.getElementById('supplierPhone').value.trim();
    const address = document.getElementById('supplierAddress').value.trim();

    if (!name || !email || !phone || !address) {
        alert('Please fill all fields!');
        return;
    }

    if (editingIndex === null) {
        suppliers.push({ name, email, phone, address });
    } else {
        suppliers[editingIndex] = { name, email, phone, address };
        editingIndex = null; 
    }

    supplierForm.reset();
    saveSuppliersToLocalStorage();
    renderSuppliers();
});

function saveSuppliersToLocalStorage() {
    localStorage.setItem('suppliers', JSON.stringify(suppliers)); 
}

function renderSuppliers() {
    supplierTable.innerHTML = ''; 
    if (suppliers.length === 0) {
        supplierTable.innerHTML = '<tr><td colspan="5" style="text-align: center;">No suppliers available</td></tr>';
        return;
    }

    suppliers.forEach((supplier, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.email}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.address}</td>
            <td>
                <button onclick="editSupplier(${index})">Edit</button>
                <button onclick="deleteSupplier(${index})">Delete</button>
            </td>
        `;
        supplierTable.appendChild(row);
    });
}

function editSupplier(index) {
    const supplier = suppliers[index];
    document.getElementById('supplierName').value = supplier.name;
    document.getElementById('supplierEmail').value = supplier.email;
    document.getElementById('supplierPhone').value = supplier.phone;
    document.getElementById('supplierAddress').value = supplier.address;
    editingIndex = index; 
}

function deleteSupplier(index) {
    suppliers.splice(index, 1); 
    saveSuppliersToLocalStorage(); 
    renderSuppliers(); 
}

renderSuppliers();
