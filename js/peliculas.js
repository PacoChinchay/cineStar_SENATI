import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC9_6kHjDTEpFBBSqodpz2fpOuzh88X4gE",
  authDomain: "cine-star-2137c.firebaseapp.com",
  projectId: "cine-star-2137c",
  storageBucket: "cine-star-2137c.firebasestorage.app",
  messagingSenderId: "45216427402",
  appId: "1:45216427402:web:25d6a8ed96ca5ff2226c73"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getPeliculas() {
  try {
    // const params = new URLSearchParams(window.location.search);
    // const id = params.get("id");
    // const res = await fetch(`http://localhost/cinestar_sweb_php/peliculas/${id}`);
    // const json = await res.json();
    // if (!json.success || !json.data) return;


    const snap = await getDocs(collection(db, "peliculas"));


    const contenedor = document.getElementById("contenido-interno");
    let html = `<br/><h1>Cartelera</h1><br/>`;

    snap.forEach(pelicula => {

      const p = pelicula.data();
      html += `
        <div class="contenido-pelicula">
          <div class="datos-pelicula">
            <h2>${p.Titulo}</h2>
            <p>${p.Sinopsis}</p>
            <br/>
            <div class="boton-pelicula"> 
              <a href="pelicula.html?id=${p.id}">
                <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
              </a>
            </div>
            <div class="boton-pelicula"> 
              <a href="https://www.youtube.com/watch?v=${p.Link}" target="_blank">
                <img src="img/varios/btn-trailer.jpg" width="120" height="30"  alt="Ver trailer"/>
              </a>
            </div> 
          </div>
          <img src="img/pelicula/${p.id}.jpg" width="160" height="226"/><br/><br/>
        </div>
      `;
    });

    contenedor.innerHTML = html;
  } catch (error) {
    console.error("Error cargando películas:", error);
  }
};

getPeliculas();