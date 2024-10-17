let params = new URLSearchParams(window.location.search);
let id = params.get('id');

if (id) {
    fetch('../../../src/singup.php?id='+id).then(function(resposta) {
        return resposta.json()
    }).then(function(data) {
        console.log(data)
        populate(data)
    })
}

function populate(data) {
    document.getElementById("email").value = data[0].email
    document.getElementById("senha").value = data[0].senha
   
            
}

let form = document.getElementById('form')

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch(`../../../src/pessoa.php${id ? '?id=' + id : ''}`, {
        method: id ? 'PUT' : 'POST',
        body: JSON.stringify({
            codigo: document.getElementById("email").value,
            nome: document.getElementById("senha").value,
            
           
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