const text_el = document.querySelector('.text')
const heading_el = document.querySelector('.heading')
const todos_container = document.querySelector('.todos-container')

text_el.addEventListener('change', () => populateTodo())

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => populateTodo(todo))
}

function populateTodo(todo) {

    const todo_container_el = document.createElement('div')
    todo_container_el.classList.add('todo-container')


    if(todo) {
        if(todo.completed) {
            todo_container_el.innerHTML = `
                <div class="todo completed">${todo.text}</div>
                <i class="close hidden fas fa-close"></i>
            `
        }
        else {
            todo_container_el.innerHTML = `
                <div class="todo">${todo.text}</div>
                <i class="close hidden fas fa-close"></i>
                `
        }
    }
    else {
    todo_container_el.innerHTML = `
        <div class="todo">${text_el.value}</div>
        <i class="close hidden fas fa-close"></i>
    `
    }

    todos_container.appendChild(todo_container_el)
    todo_container_el.addEventListener('click', () => {
        todo_container_el.firstElementChild.classList.toggle('completed');
        saveToBrowser()
})

    todo_container_el.addEventListener('mouseover', () => {
        todo_container_el.lastElementChild.classList.remove('hidden')
    })
    todo_container_el.addEventListener('mouseout', () => {
        todo_container_el.lastElementChild.classList.add('hidden')
    })


    todo_container_el.lastElementChild.addEventListener('click', () => todo_container_el.remove())
    saveToBrowser()
}


function saveToBrowser() {
    const todos = []

    all_todos_el = document.querySelectorAll('.todo')

    all_todos_el.forEach(todo => {
        todos.push({
            text : todo.innerHTML,
            completed : todo.classList.contains('completed')
        })
    })


    localStorage.setItem('todos', JSON.stringify(todos))
}