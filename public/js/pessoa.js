let params = new URLSearchParams(window.location.search);
let id = params.get('id');

if (id) {
    fetch('../../../src/pessoa.php?id='+id).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        console.log(data)
        populate(data)
    })
}

function populate(data) {
    document.getElementById("codigo").value = data[0].codigo
    document.getElementById("nome").value = data[0].nome
    document.getElementById("documento").value = data[0].documento
   
            
}

let form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`../../../src/pessoa.php${id ? '?id=' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({
            codigo: document.getElementById("codigo").value,
            nome: document.getElementById("nome").value,
            documento: document.getElementById("documento").value,
           
        }),
        headers: {
            'Content-Type': 'application/json'
        }    
    }).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        window.alert(data.msg)
        
        if (data.status == 'ok') {
            window.location = 'index.shtml'
        }
    })
})