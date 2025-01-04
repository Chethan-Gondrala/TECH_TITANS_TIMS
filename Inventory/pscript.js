const productForm = document.getElementById('productForm');
const productTable = document.getElementById('productTable');
let products = JSON.parse(localStorage.getItem('products')) || [];
let editingIndex = null;
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const stockLevel = document.getElementById('stockLevel').value;
    const reorderPoint = document.getElementById('reorderPoint').value;
    if (!name || !category || !stockLevel || !reorderPoint) {
        alert('Please fill all fields!');
        return;
    }

    if (editingIndex === null) {
        products.push({ 
            name, 
            category, 
            stockLevel: parseInt(stockLevel), 
            reorderPoint: parseInt(reorderPoint) 
        });
    } else {
        products[editingIndex] = { 
            name, 
            category, 
            stockLevel: parseInt(stockLevel), 
            reorderPoint: parseInt(reorderPoint) 
        };
        editingIndex = null; 
    }
    productForm.reset(); 
    saveProductsToLocalStorage();
    renderProducts(); 
});
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
function renderProducts() {
    productTable.innerHTML = '';
    if (products.length === 0) {
        productTable.innerHTML = '<tr><td colspan="5" style="text-align: center;">No products available</td></tr>';
        return;
    }
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stockLevel}</td>
            <td>${product.reorderPoint}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productTable.appendChild(row);
    });
}
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('stockLevel').value = product.stockLevel;
    document.getElementById('reorderPoint').value = product.reorderPoint;
    editingIndex = index; 
}
function deleteProduct(index) {
    products.splice(index, 1);
    saveProductsToLocalStorage();
    renderProducts();
}
renderProducts();