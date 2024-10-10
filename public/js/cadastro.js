let cancelar = document.getElementById('cancelar')

cancelar.addEventListener('click', () => {
    window.location = 'index.shtml'
})

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
    document.getElementById("id").value = data[0].codigo
    document.getElementById("name").value = data[0].nome
    document.getElementById("documento").value = data[0].documento
    document.getElementById("nascimento").value = data[0].data_nascimento
}

let form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`../../../src/pessoa.php${id ? '?id=' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({
            nome: document.getElementById("name").value,
            documento: document.getElementById("documento").value,
            nascimento: document.getElementById("nascimento").value
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