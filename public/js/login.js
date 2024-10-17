
let params = new URLSearchParams(window.location.search);
let id = params.get('id');

if (id) {
    fetch('../../../src/login.php?id='+id).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        console.log(data)
        populate(data)
    })
}

function populate(data) {
    document.getElementById("logradouro").value = data[0].logradouro
    document.getElementById("numero").value = data[0].numero
    document.getElementById("bairro").value = data[0].bairro
    document.getElementById("cep").value = data[0].cep
            
}

let form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`../../../src/pessoa.php${id ? '?id=' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({
            logradouro: document.getElementById("logradouro").value,
            numero: document.getElementById("numero").value,
            bairro: document.getElementById("bairro").value,
            cep: document.getElementById("cep").value,
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