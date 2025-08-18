const getPeliculas = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const res = await fetch(`http://localhost/cinestar_sweb_php/peliculas/${id}`);
    const json = await res.json();

    if (!json.success || !json.data) return;

    const contenedor = document.getElementById("contenido-interno");
    let html = `<br/><h1>${id === 'cartelera' ? 'Cartelera' : 'Próximos Estrenos'}</h1><br/>`;

    json.data.forEach(pelicula => {
      html += `
        <div class="contenido-pelicula">
          <div class="datos-pelicula">
            <h2>${pelicula.Titulo}</h2>
            <p>${pelicula.Sinopsis}</p>
            <br/>
            <div class="boton-pelicula"> 
              <a href="pelicula.html?id=${pelicula.id}">
                <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
              </a>
            </div>
            <div class="boton-pelicula"> 
              <a href="https://www.youtube.com/watch?v=${pelicula.Link}" target="_blank">
                <img src="img/varios/btn-trailer.jpg" width="120" height="30"  alt="Ver trailer"/>
              </a>
            </div> 
          </div>
          <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
        </div>
      `;
    });

    contenedor.innerHTML = html;
  } catch (error) {
    console.error("Error cargando películas:", error);
  }
};

getPeliculas();