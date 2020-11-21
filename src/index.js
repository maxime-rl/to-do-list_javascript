import "./style.css";

const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('form > input');


form.addEventListener('submit', (event) => {
    event.preventDefault(); // on évite de recharger la page lors du submit
    const value = input.value;
    input.value = '';
    addTodo(value);
});

const todos = [
    {
        text: 'Je suis une todo',
        done: false,
        editMode: true
    },
    {
        text: 'Faire du Javascript',
        done: true,
        editMode: false
    }
]


const displayTodo = () => { // on parcours le tableau de todos qu'on transforme pour accueillir des nodes
    const todosNode = todos.map((todo, index) => { // méthode map pour parcourir le tableau
        if (todo.editMode) {
            return createTodoEditElement(todo, index);
        } else {
            return createTodoElement(todo, index);
        }
    });
    ul.innerHTML = '';
    ul.append(...todosNode); // méthode append pour ajouter des éléments à l'intérieur d'un autre élément et l'opérateur spread (...) permet de transformer le tableau de nodes en une liste de nodes
};


const createTodoElement = (todo, index) => {
    const li = document.createElement('li'); // création des nodes ( ici éléments)
    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'Supprimer';
    const buttonEdit = document.createElement('button');
    buttonEdit.innerHTML = 'Edit';
    buttonDelete.addEventListener('click', event => {
        event.stopPropagation();
        deleteTodo(index); // le système de closure permet d'avoir accès à l'environnement lexical extérieur, ici le contexte fait que l'index existe
    });
    buttonEdit.addEventListener('click', event => {
        event.stopPropagation();
        toggleEditMode(index);
    })
    li.innerHTML = `
    <span class="todo ${ todo.done ? 'done' : '' }"></span>
    <p>${ todo.text }</p>
    `;
    li.addEventListener('click', (event) => {
        toggleTodo(index);
    })
    li.append(buttonEdit, buttonDelete);
    li.appendChild(buttonDelete);
    return li;
};

const createTodoEditElement = (todo, index) => {
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    const buttonSave = document.createElement('button');
    buttonSave.innerHTML = 'Save';
    const buttonCancel = document.createElement('button');
    buttonCancel.innerHTML = 'Cancel';
    buttonCancel.addEventListener('click', event => {
        event.stopPropagation();
        toggleEditMode(index);
    })
    buttonSave.addEventListener('click', event => {
        editTodo(index, input);
    })
    li.append(input, buttonCancel, buttonSave);
    return li;
};

const addTodo = (text) => {
    todos.push({ // méthode push pour ajouter un éléments au tableau
        text,
        done: false
    });
    displayTodo();
};

const deleteTodo = (index) => {
    todos.splice(index, 1);  // on supprime l'index de notre todo, 1 pour le nombre d'élément à supprimer
    displayTodo(); // on réinvoque la méthode displayTodo pour rafraichir l'affichage
};

const toggleTodo = (index) => {
    todos[index].done = !todos[index].done;
    displayTodo();
}

const toggleEditMode = (index) => {
    todos[index].editMode = !todos[index].editMode;
    displayTodo();
}

const editTodo = (index, input) => {
    const value = input.value;
    todos[index].text = value;
    todos[index].editMode = false;
    displayTodo();
}

displayTodo();