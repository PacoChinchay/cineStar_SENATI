const getCines = async () => {
  const res = await fetch("http://localhost/cinestar_sweb_php/cines");
  const json = await res.json();

  if (json.success && Array.isArray(json.data)) {
    const contenedor = document.getElementById("contenido-interno");
    contenedor.innerHTML = `<br /><h1>Nuestros Cines</h1><br />`;

    json.data.forEach(cine => { 
      const html = `
        <div class="contenido-cine">
          <img src="img/cine/${cine.id}.1.jpg" width="227" height="170" />
          <div class="datos-cine">
            <h4>${cine.RazonSocial}</h4><br />
            <span>${cine.Direccion} - ${cine.Ciudad}<br /><br />Teléfono: ${cine.Telefonos}</span>
          </div>
          <br />
          <a href="http://www.cinestar.com.pe/multicines/cine/${encodeURIComponent(cine.RazonSocial)}">
            <img src="img/varios/ico-info2.png" width="150" height="40" />
          </a>
        </div>
      `;

      contenedor.innerHTML += html;
    });
  }
}

getCines();
