let username = document.querySelector('#login');
const lista = document.getElementById('lista');
const formData = new FormData();


document.querySelector('#comprobar').addEventListener('click', function (e) {
    formData.append('login', username.value);
    
    fetch('https://intranetjacaranda.es/Ejercicios/compruebaDisponibilidadJSON.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(datos => {
            console.log(datos);
            let msg = document.querySelector('#disponibilidad');
            if (datos.disponible==="si") {
                msg.innerText = 'El nombre de usuario esta disponible';
            }else if (datos.disponible==="no"){
                msg.innerText = 'El nombre de usuario NO esta disponible, aqui tiene otras soluciones';
                
                for (const alternativa of datos.alternativas) {
                    let avaliableList = document.createElement('li');
                    avaliableList.textContent = alternativa
                    lista.appendChild(avaliableList);
                }
                
            }
       
        })
        .catch(err => {
            console.log('Error en la petición HTTP: ' + err.message);
        })
})