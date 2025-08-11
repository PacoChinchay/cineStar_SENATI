const getPelicula = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
    const res = await fetch(`http://localhost/cinestar_sweb_php/peliculas/${id}`);
    const json = await res.json();
    
    if (!json.success || !json.data) {
      console.error("No se encontró la película");
      return;
    }
    
    const pelicula = json.data;
    const contenedor = document.getElementById("contenido-interno");
    
    const fechaEstreno = new Date(pelicula.FechaEstreno);
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fechaEstreno.toLocaleDateString('es-ES', opcionesFecha);
    
    contenedor.innerHTML = `
      <br/><h1>${pelicula.Titulo}</h1><br/>
      <div class="contenido-pelicula">
        <div class="datos-pelicula">
          <h2>${pelicula.Titulo}</h2>
          <p>${pelicula.Sinopsis}</p>
          <br/>
          <div class="tabla">
            <div class="fila">
              <div class="celda-titulo">Título Original :</div>
              <div class="celda">${pelicula.Titulo}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Estreno :</div>
              <div class="celda">${fechaFormateada}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Género :</div>
              <div class="celda">${pelicula.Geneross}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Director :</div>
              <div class="celda">${pelicula.Director}</div>
            </div>
            <div class="fila">
              <div class="celda-titulo">Reparto :</div>
              <div class="celda">${pelicula.Reparto}</div>
            </div>
          </div>
        </div>
        <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"><br/><br/>
      </div>
      <div class="pelicula-video">
        <embed src="https://www.youtube.com/v/${pelicula.Link}" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="580" height="400">
      </div>
    `;
  } catch (error) {
    console.error("Error cargando detalles de la película:", error);
  }
};

getPelicula();