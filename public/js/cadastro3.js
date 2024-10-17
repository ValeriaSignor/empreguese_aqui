

let params = new URLSearchParams(window.location.search);
let id = params.get('id');

if (id) {
    fetch('../../../src/cadastro3.php?id='+id).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        console.log(data)
        populate(data)
    })
}

function populate(data) {
    document.getElementById("razão social").value = data[0].razãosocial
    document.getElementById("nome fantasma").value = data[0].nomefantasma
    document.getElementById("cnpj").value = data[0].cnpj
    
}

let form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`../../../src/pessoa.php${id ? '?id=' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({
            razãosocial: document.getElementById("razão social").value,
            nomefantasma: document.getElementById("nome fantasma").value,
            cnpj: document.getElementById("cnpj").value,
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