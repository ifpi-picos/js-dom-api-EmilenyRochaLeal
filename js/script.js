let inputdesc = document.querySelector(".to-do-input")
let bntAdd = document.getElementById("btn-add");
let bntView = document.getElementById("to-view");
let iconElement = bntView.querySelector('i');
let ulLista = document.getElementById('list-container');
let tarefas =  [];

function verificar(){
    if (localStorage.hasOwnProperty("tarefas")){
        tarefas = JSON.parse(localStorage.getItem("tarefas"));
    }
}
function adicionar(){
    tarefas.push({desc: inputdesc.value, concluida: false});
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function deletar(index){
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    visualizar()
}
function concluir(index){
    tarefas[index].concluida = !tarefas[index].concluida; // Alterna o estado da tarefa

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    visualizar();
}

function visualizar() {
    let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
    
    if (tarefasSalvas) { 
        ulLista.innerHTML = ``;
        tarefasSalvas.forEach((tarefa, index) => {
            let li = document.createElement("li");
            let icone = tarefa.concluida ? 'bi bi-check-circle' : 'bi bi-circle';
            li.innerHTML = `<button class="to-bnt" onclick="concluir(${index})"><i class="${icone}"></i></button>
                            <span class="li-span ${tarefa.concluida ? 'concluida' : ''}"> ${tarefa.desc} </span> 
                            <hr>
                            <button class="to-bnt" onclick="deletar(${index})"><i class="bi bi-trash3"></i></button>`;
            ulLista.appendChild(li);
        });
    } else {

        ulLista.innerHTML = `<span>Não há tarefas salvas. </span>`;
    }
}

bntView.addEventListener('click', ()=>{
    if (iconElement.classList.contains('bi-caret-down')) {
        iconElement.classList.remove('bi-caret-down');
        iconElement.classList.add('bi-caret-up');
        visualizar(); 
        ulLista.style.display = 'block'; 
    } else {
        iconElement.classList.remove('bi-caret-up');
        iconElement.classList.add('bi-caret-down');
        ulLista.style.display = 'none'; 
    }

});

bntAdd.addEventListener('click', ()=>{
    verificar();
    adicionar();
    visualizar();
    inputdesc.value = '';
});


