let CLIENT_ID = '984273367137-6eatehe2iviibs47cfg9tsuhhdc1q15q.apps.googleusercontent.com';
let API_KEY = 'AIzaSyCBT71VD-jg4AD2DN8R2feUvtWN4rJE68w';
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar";

const tbody = document.querySelector("tbody");
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
    tarefas.push({desc: inputdesc.value});
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function deletar(){
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function editar(index){
    const novaTarefa = prompt("Edite", tarefas[index].text);
    if (novaTarefa !== null){
        tarefas[index].text == novaTarefa;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
}

function visualizar(){
    ulLista.innerHTML = '';
    let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
    tarefasSalvas.forEach((tarefa, index)=>{
        let li = document.createElement("li");
        li.textContent = tarefa.desc;
        ulLista.appendChild(li);
    })
}
bntView.addEventListener('click', ()=>{
    if (iconElement.classList.contains('bi-caret-down')) {
        iconElement.classList.remove('bi-caret-down');
        iconElement.classList.add('bi-caret-up');
        visualizar(); // Chama a função para exibir as tarefas
        ulLista.style.display = 'block'; // Mostra a lista
    } else {
        iconElement.classList.remove('bi-caret-up');
        iconElement.classList.add('bi-caret-down');
        ulLista.style.display = 'none'; // Oculta a lista
    }

});

bntAdd.addEventListener('click', ()=>{
    verificar();
    adicionar();
    inputdesc.value = '';
    visualizar();
});
// bntDelete.addEventListener('click', deletar);
// bntEdite.addEventListener('click', editar);

