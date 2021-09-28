/* Atribuição de variáveis */
const div_search = document.getElementById('search');
const input_addTask = document.getElementById('addTaskInput');
const addForm = document.getElementById('addForm');
const section_Addtask = document.getElementById('sectionAddTodo');
const date = new Date();
const todos = [];
let idGlobal = 0;

function addTodotoArray(obj) {
    obj.id = idGlobal;
    todos.push(obj);
    createTask(obj, idGlobal++);
}

/* FUNÇÃO CRIAR CARD */
function createTask(obj, id) {
    const div_task = document.createElement('div');
    div_task.classList.add('task');
    if (obj.completed == true) {
        div_task.classList.add('tachado');
    }
    div_task.innerHTML = `
        <input class="check" type="checkbox" name="" id="">
        <p class="title-task">${obj.title}</p>
        <div class="options">
            <span class="id-task">id: ${id}</span>
           
            <button class="delete-button" data-idTask="${id}">
                <i class="fas fa-trash-alt"></i>
            </button>
            <div class="modal-delete-todo">
               <div class="container-sim-nao">                   
                    <button class="sim-delete" type="button" >EXCLUIR</button>
                    <button class="nao-delete" type="button" >CANCELAR</button>                   
                </div>
            </div>
        </div>`

    document.getElementById('todoContainer').appendChild(div_task);
    removeTask();
}

/* Função Remover ToDo */
function removeTask() {
    let simDelete = document.querySelectorAll('.sim-delete');
    let task = document.querySelectorAll('.task');
    let naoDelete = document.querySelectorAll('.nao-delete');
    let deleteModal = document.querySelectorAll('.modal-delete-todo');
    let deleteButton = document.querySelectorAll('.delete-button');
    for(let i=0; i < task.length; i++ ){
        simDelete[i].addEventListener('click', () => {
            task[i].remove();
        })
        naoDelete[i].addEventListener('click', () => {
            deleteModal[i].style.display = "none";        
        })
        deleteButton[i].addEventListener('click', () => {
            deleteModal[i].style.display = "flex";           
        })
    }
}
removeTask();

/* Função validar inputs */
function validarInputs(input) {
    if (input.value.trim() == '') {
        alert('Campo vazio');
        return false;
    }
    return true;
}

// Event listeners
div_search.addEventListener('click', function (e) {
    document.getElementById('searchInput').classList.add('active');
});

input_addTask.addEventListener('focus', function (e) {
    document.getElementById('extras').classList.add('active');
    document.getElementById('data').value = date.toLocaleDateString();
});

input_addTask.addEventListener('keydown', function (e) {
    while (input_addTask.scrollHeight > input_addTask.offsetHeight) {
        input_addTask.rows += 1;
    }
});

addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputsValido = Array.from(addForm.querySelectorAll('input, textarea')).every(input => validarInputs(input));
    if (inputsValido) {
        const form = e.target;
        const formData = new FormData(form);
        const obj = {};
        formData.forEach((value, key) => obj[key] = value);
        addTodotoArray(obj);
        document.getElementById('extras').classList.remove('active');
        form.reset();
        input_addTask.focus();
        window.scrollTo(0, document.body.scrollHeight); /* toda vez que for add nova tarefa o scroll puxa para baixo  */
    }
});

// Global events listener
document.addEventListener('click', function (e) {
    if (!e.target.closest('#sectionAddTodo')) {
        document.getElementById('extras').classList.remove('active');
        input_addTask.rows = 1;
    }

    if (!e.target.closest("#search")) {
        if (search.value > "") {
          return null;
        } else {
        document.getElementById("searchInput").classList.remove("active");
        }
      }
});

/* FUNÇÃO DARK MODE */
function mudarCor(checkbox) {
    document.body.style.backgroundColor = checkbox.checked ? "#202124" : "";
    document.body.style.color = checkbox.checked ? "#e8eaed" : "";
    document.getElementById("todoContainer").style.color = checkbox.checked ? "#202124" : ""; 
};


/* SEARCH INPUT */
let search = document.getElementById("searchInput");
search.onkeyup = () => {
    let filter = search.value.toUpperCase();
    let p = document.getElementsByTagName("p");

    for (i = 0; i < p.length; i++) {
        txtValue = p[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            p[i].parentElement.style.display = "";
        } else {
            p[i].parentElement.style.display = "none";
        }
    }
};
