// Selecting DOM elements
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const addIncomeBtn = document.getElementById('addIncome');
const addExpenseBtn = document.getElementById('addExpense');

// Income and Expense containers
const incomeContainer = document.querySelector('.Income-1');
const expenseContainer = document.querySelector('.Expense');

// Initial values for totals
let totalEarned = 0; // Initial value as shown in your example
let totalAvailable = 0;
let totalSpent = 0;

// Function to update totals
function updateTotals() {
    document.querySelector('.S-1').textContent =`$${totalEarned.toFixed(2)}` ;
    document.querySelector('.S-2').textContent =`$${totalAvailable.toFixed(2)} `;
    document.querySelector('.S-3').textContent = `$${totalSpent.toFixed(2)}`;
}

// Function to create a new income/expense item
function createItem(type, desc, amt) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('Pay');
    newDiv.classList.add('sold');

    if (type === 'income') {
        newDiv.innerHTML = `<p>${desc}</p><span style="color: green;">$${amt}</span><i class="fa-regular fa-trash-can"></i>`;
        incomeContainer.appendChild(newDiv);
    } else if (type === 'expense') {
        newDiv.innerHTML = `${desc}<span style="color: red;">$${amt}</span><i class="fa-regular fa-trash-can"></i>`;
        expenseContainer.appendChild(newDiv);
    }

    // Enable delete functionality for the trash icon
    const trashIcon = newDiv.querySelector('i');
    trashIcon.addEventListener('click', function() {
        newDiv.remove();
        // Update totals when an item is deleted
        if (type === 'income') {
            totalEarned -= amt;
            totalAvailable -= amt;
        } else if (type === 'expense') {
            totalSpent -= amt;
            totalAvailable += amt;
        }
        updateTotals();
    });
}

// Event listener for adding income
addIncomeBtn.addEventListener('click', () => {
    const desc = description.value.trim();
    const amt = parseFloat(amount.value);

    if (desc && !isNaN(amt) && amt > 0) {
        // Add income item
        createItem('income', desc, amt);
        // Update totals
        totalEarned += amt;
        totalAvailable += amt;
        updateTotals();
    }

    // Clear input fields
    description.value = '';
    amount.value = '';
});

// Event listener for adding expense
addExpenseBtn.addEventListener('click', () => {
    const desc = description.value.trim();
    const amt = parseFloat(amount.value);

    if (desc && !isNaN(amt) && amt > 0) {
        // Add expense item
        createItem('expense', desc, amt);
        // Update totals
        totalSpent += amt;
        totalAvailable -= amt;
        updateTotals();
    }

    // Clear input fields
    description.value = '';
    amount.value = '';
});

// Initialize totals on page load
updateTotals();