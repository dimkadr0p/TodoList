const addMesage = document.querySelector(".message");

const addTask = document.querySelector(".add");

const todo = document.querySelector(".todo-list");

const clearTodo = document.querySelector(".clear");

let todoList = [];


if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessage();
} 


function isEmpty(todoList) {
    return todoList.length === 0;
}

function checkInput() {
    if(addMesage.value) {
        return true;
    } 
    return false;
}

function displayMessage() {
    let displayMessage = '';

    if(isEmpty(todoList)) {
        todo.innerHTML = '';
        return;
    };
    
    todoList.forEach((item, i) => {
        displayMessage += `
            <li>
                <input type='checkbox' id=item_${i} ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class="${item.important ? 'important': ''}">${item.todo}</label>
                <span id=close_item_${i} class="close">✖</span>
            </li>
        `;
    });

    todo.innerHTML = displayMessage;
};


function checkRepeatMessage(messageObject) {
    return todoList.some((obj) => obj.todo === messageObject.todo);
}

addMesage.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        addTask.click();
    } 

});

addTask.addEventListener('click', () => {
    
    if(!checkInput()) {
        alert("Вы не написали никакого сообщения");
        return;
    }
    
    let newTodo = {
        todo: addMesage.value,
        checked: false,
        important: false
    };

    if(checkRepeatMessage(newTodo)) {
        alert("Такая задача уже добавлена");
        return;
    }

    todoList.push(newTodo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
});


todo.addEventListener('change', (event) => {

    let valueLabel = todo.querySelector('[for='+  event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach((item) => {
        if(item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});


todo.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    todoList.forEach((item) => {
        if(item.todo === event.target.innerHTML) {
            item.important = !item.important;
            displayMessage();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});


todo.addEventListener("click", (event) => {
    const close = event.target.getAttribute('id');
    if(close == null) {
        return;
    }

    if(close.includes('close_item_')) {

        const numberId = parseInt(close.match(/\d+/));

        todoList.splice(numberId, 1);

        displayMessage();

        localStorage.setItem('todo', JSON.stringify(todoList));

    }

});


clearTodo.addEventListener('click', () => {
    if(isEmpty(todoList)) alert("Список задач пуст");
    else {
        todoList.length = 0;
        displayMessage();
        localStorage.setItem('todo', JSON.stringify(todoList));
    }

});