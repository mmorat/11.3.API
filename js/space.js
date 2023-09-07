document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencia a los elementos del DOM
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    // Agregar un evento de clic al botón de búsqueda
    btnBuscar.addEventListener("click", function () {
      // Obtener el valor del campo de entrada
      const busqueda = inputBuscar.value.trim();
  
      // Verificar que se haya ingresado un término de búsqueda
      if (busqueda === "") {
        alert("Por favor, ingrese un término de búsqueda");
        return;
      }
  
      // Realizar la solicitud a la API de la NASA
      const apiUrl = `https://images-api.nasa.gov/search?q=${busqueda}`;
      
      // Realizar la solicitud AJAX usando fetch
      fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Limpiar el contenido anterior en el contenedor
          contenedor.innerHTML = "";
  
          // Verificar si se encontraron resultados
          if (data.collection.items.length === 0) {
            contenedor.innerHTML = "No se encontraron resultados.";
            return;
          }
  
          // Iterar a través de los elementos y mostrarlos en el contenedor
          data.collection.items.forEach((item) => {
            // Crear elementos HTML para mostrar la información
            const divResultado = document.createElement("div");
            divResultado.classList.add("resultado");
  
            const img = document.createElement("img");
            img.src = item.links[0].href;
            img.alt = item.data[0].title;
  
            const titulo = document.createElement("h3");
            titulo.textContent = item.data[0].title;
  
            const descripcion = document.createElement("p");
            descripcion.textContent = item.data[0].description;
  
            const fecha = document.createElement("p");
            fecha.textContent = item.data[0].date_created;
  
            // Agregar los elementos al contenedor
            divResultado.appendChild(img);
            divResultado.appendChild(titulo);
            divResultado.appendChild(descripcion);
            divResultado.appendChild(fecha);
  
            contenedor.appendChild(divResultado);
          });
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    });
  });
  