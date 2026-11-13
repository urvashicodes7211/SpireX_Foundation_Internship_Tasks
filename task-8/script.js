let expenses = [];

function addExpense(){
    let name = document.getElementById("expenseName").value;
    let amount = Number(document.getElementById("expenseAmount").value);

    if (name.trim() === "" || amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter valid expense details!");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: new Date().toLocaleDateString()
    };

    expenses.push(expense);
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    displayExpenses();
}

function displayExpenses(){
    let expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    expenses.forEach(function(expense){
        let li = document.createElement("li");
        let info = document.createElement("div");
        info.className = "expense-info";
        let name = document.createElement("strong");
        name.textContent = expense.name;
        let amount = document.createElement("p");
        amount.textContent = "₹" + expense.amount.toFixed(2);
        let date = document.createElement("small");
        date.textContent = expense.date;
        info.appendChild(name);
        info.appendChild(amount);
        info.appendChild(date);
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function(){
            deleteExpense(expense.id);
        };
        li.appendChild(info);
        li.appendChild(deleteBtn);
        expenseList.appendChild(li);
    });

    calculateTotal();
}

function calculateTotal(){
    let total = expenses.reduce(function(sum, expense){
        return sum + expense.amount;
    }, 0);
    document.getElementById("total").textContent =
        "₹" + total.toFixed(2);
}

function deleteExpense(id){
    expenses = expenses.filter(function(expense){
        return expense.id !== id;
    });
    displayExpenses();
}
