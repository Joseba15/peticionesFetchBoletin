let username = document.querySelector('#login').value;
document.querySelector('#comprobar').addEventListener('click',function (e) {
    
    fetch('https://intranetjacaranda.es/Ejercicios/compruebaDisponibilidad.php?login'+username)
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos =>{
       let msg = document.querySelector('#disponibilidad');
       if (datos=='si') {
            msg.innerText='El nombre de usuario esta disponible'
            
        }else{
            msg.innerText='El nombre de usuario NO esta disponible'

        }
        
    })
    .catch(err => {
        console.log('Error en la petición HTTP: '+err.message);
    })
})