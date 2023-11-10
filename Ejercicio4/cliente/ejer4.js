const listaProvincias = document.getElementById('provincias');
const listaMunicipios = document.getElementById('municipios');

const formData = new FormData();

fetch('https://intranetjacaranda.es/Ejercicios/cargaProvinciasXML.php')
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        return Promise.reject(response);
    })
    .then(datos => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(datos, "application/xml");


        let provincias = xml.getElementsByTagName('provincia');
        for (let i = 0; i < provincias.length; i++) {
            const provincia = provincias[i];
            let optionElem = document.createElement('option');
            optionElem.setAttribute('value',provincia.children[0].textContent)
            optionElem.textContent = provincia.children[1].textContent
            listaProvincias.appendChild(optionElem);
        }
    })
    .catch(err => {
        console.log('Error en la petición HTTP: ' + err.message);
    })


listaProvincias.addEventListener('change',function (e) {
    const provinciaSelect = listaProvincias.options[listaProvincias.selectedIndex];
    const codigo = provinciaSelect.getAttribute("value");
    formData.append('provincia', codigo);
    
    fetch('https://intranetjacaranda.es/Ejercicios/cargaMunicipiosXML.php', {
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

            let municipios = xml.getElementsByTagName('nombre');
            console.log(municipios);
            for (let i = 0; i < municipios.length; i++) {
                const mun = municipios[i];
                let optionElem = document.createElement('option');
                optionElem.textContent = mun.textContent
                listaMunicipios.appendChild(optionElem);
            }
          

        })
        .catch(err => {
            console.log('Error en la petición HTTP: ' + err.message);
        })
    
})



