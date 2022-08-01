const newTask = (name, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('task')
    item.innerHTML = `<li>
                        <label class="todo__item">
                        <input type="checkbox" ${status} data-indice=${indice}>
                        <span type="span" class="task">${name}</span>
                        </label> 
                        <div type="div">
                            <button class="btnAction hide">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <button type="button" class="btnAction trash" value="x" data-indice=${indice}>
                                <i class="fa-solid fa-trash-can" value="x" data-indice=${indice}></i>
                            </button>
                        </div>
                        </li>`
    document.querySelector('#task-list').appendChild(item)
}

const limparTarefas = () => {
    const taskList = document.querySelector('#task-list')
    while (taskList.firstChild){
        taskList.removeChild(taskList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach((item, indice) => newTask(item.task, item.status, indice))
}

const addTask = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if (tecla === 'Enter'){
        const banco = getBanco()
        banco.push({'task': texto, 'status': ''})
        setBanco(banco)
        atualizarTela()
        evento.target.value = ''
    }
}

const deleteItem = (indice) => {
    const banco = getBanco()
    banco.splice(indice, 1)
    setBanco(banco)
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco()
    if (banco[indice].status === ''){
        banco[indice].status = 'checked'
    }else  if (banco[indice].status === 'checked'){
        banco[indice].status = ''
    }
    setBanco(banco)
    atualizarTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === 'button' || elemento.type === 'i') {
        const indice = elemento.dataset
        deleteItem(indice)
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset
        atualizarItem(indice)
    }
}



/*
const editarItem = (indice, novaTarefa) => {
    const banco = getBanco()
    banco.splice(indice, 1, novaTarefa)
    setBanco(banco)
    atualizarTela()
}
 */


document.querySelector('#newTask').addEventListener('keypress', addTask)
document.querySelector('#task-list').addEventListener('click', clickItem)

const getBanco = () => JSON.parse(localStorage.getItem('taskList')) ?? []
const setBanco = (banco) => localStorage.setItem('taskList', JSON.stringify(banco))


atualizarTela()