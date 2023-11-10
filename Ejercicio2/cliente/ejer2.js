let username = document.querySelector('#login');
const lista = document.getElementById('lista');
const formData = new FormData();


document.querySelector('#comprobar').addEventListener('click', function (e) {
    formData.append('login', username.value);
    
    fetch('https://intranetjacaranda.es/Ejercicios/compruebaDisponibilidadXML.php', {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            return Promise.reject(response);
        })
        .then(datos => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(datos, "application/xml");
            let msg = document.querySelector('#disponibilidad');


            if (xml.getElementsByTagName('disponible')[0].textContent == 'si') {
                msg.innerText = 'El nombre de usuario esta disponible'

            } else {
                msg.innerText = 'El nombre de usuario NO esta disponible, aqui tiene otras alternativas'
                let alternativas = xml.getElementsByTagName('login');
                console.log(alternativas);
                for (let i = 0; i < alternativas.length; i++) {
                    const alternativa = alternativas[i];
                    let avaliableList = document.createElement('li');
                    avaliableList.textContent = alternativa.textContent
                    lista.appendChild(avaliableList)
                }
               
            }

        })
        .catch(err => {
            console.log('Error en la petición HTTP: ' + err.message);
        })
})