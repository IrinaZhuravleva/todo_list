//Переменные
var form = document.getElementById('addForm');
var itemsList = document.getElementById('items');
var filter = document.getElementById('filter');

var toDo = localStorage.getItem("toDo") || [];
// var toDo = localStorage.getItem("toDo");
// (localStorage.getItem("toDo") != null) ? renderItems(JSON.parse(localStorage.getItem('toDo'))) : localStorage.setItem('toDo', JSON.stringify(toDo));

// var toDo;

if (localStorage.getItem("toDo") != null) {
    toDo = JSON.parse(localStorage.getItem('toDo'));
    renderItems(toDo);
} else {
    toDo = [];
    localStorage.setItem('toDo', JSON.stringify(toDo));
}

// Прослушивание событий
form.addEventListener('submit', addItem);
filter.addEventListener('keyup', filterItems);

//Функции
// NOTE:createTodoItem принимает один параметр - какой ТЕКСТ вставить
// createDeleteButton принимает два параментра - ЧТО вставить и КУДА вставить
function filterItems(e) {
    var searchedText = e.target.value.toLowerCase();
    var items = itemsList.querySelectorAll('li');
    items.forEach(function(item){
        var itemText = item.firstChild.textContent.toLowerCase();
        if (itemText.indexOf(searchedText) != -1) {
            item.style.display= 'block';
        } else {
            item.style.display = 'none';
        }
    }); 
};

function addItem (e){
    e.preventDefault(); 
    var newItemInput = document.getElementById('newItemText');
    var newItemText = newItemInput.value;
    if (newItemText !== ''){
        createTodoItem(newItemText);
        toDo.push(newItemText);
        localStorage.setItem('toDo', JSON.stringify(toDo));   
        newItemInput.value = '';
    } else {
        alert('Введите название задачи');
    }  
};

function createTodoItem (text) {
    var newElement = document.createElement('li');
    newElement.className = 'list-group-item';
    var newTextNode = document.createTextNode(text);
    newElement.appendChild(newTextNode);
    createDeleteButton(newElement);
    itemsList.prepend(newElement);
}

function renderItems(arr) {
    for (var i = 0; i < arr.length; i++) {
        createTodoItem(arr[i]);
    }
};

function removeItem(e) {
    var text = e.target.previousSibling.textContent;
    console.log('e.target: ', e.target.previousSibling.textContent);
    if (confirm('Вы уверены, что хотите удалить?')) {    
        e.target.parentNode.remove();      
        if (toDo.indexOf(text) !== -1) {
            localStorage.setItem('toDo', JSON.stringify(toDo));
       }   
    }
}

function createDeleteButton(item) {
    var deteleBtn = document.createElement('button');
    deteleBtn.appendChild(document.createTextNode('Удалить'));
    deteleBtn.addEventListener('click', removeItem);
    deteleBtn.className = "btn btn-light btn-sm float-right";
    item.appendChild(deteleBtn);
}
