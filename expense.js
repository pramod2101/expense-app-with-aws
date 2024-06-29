// Function to fetch and display expense details
function fetchAndDisplayDetails() {
    axios.get('http://localhost:3000/') // Assuming this endpoint retrieves expense details from the server
        .then(result => {
            const detailsList = document.getElementById('details');
            detailsList.innerHTML = ''; // Clear existing list items
            
            result.data.forEach(expense => {
                const newLi = document.createElement('li');
                newLi.textContent = `${expense.name} - ${expense.email} - ${expense.password}`;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.setAttribute('class', 'delete-btn');
                deleteBtn.textContent = 'Delete Expense';
                deleteBtn.setAttribute('data-id', expense.id); // Assuming expense object has an 'id' property
                
                const editBtn = document.createElement('button');
                editBtn.setAttribute('class', 'edit-btn');
                editBtn.textContent = 'Edit Expense';
                editBtn.setAttribute('data-id', expense.id); // Set data-id attribute for identifying the expense to edit
                
                newLi.appendChild(deleteBtn);
                newLi.appendChild(editBtn);
                detailsList.appendChild(newLi);
            });
        })
        // .catch(err => console.error('Error fetching expense details:', err));
}

// Event listener for page load
window.addEventListener('load', function () {
    fetchAndDisplayDetails(); // Fetch and display expense details when the page loads
});

// Event listener for form submission
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    
    const userDetails = {
        name: event.target.name.value,
        email: event.target.email.value,
        password: event.target.password.value
    };

    axios.post('http://localhost:3000/signup', userDetails)
        .then(result => {
            console.log('user added:', result.data);
            fetchAndDisplayDetails(); // Fetch and display updated expense details after adding
            document.getElementById('form').reset(); // Reset the form
        })
        .catch(err => console.error('Error adding user:', err));
});

// Event listener for delete and edit buttons (delegate to parent)
