import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const getPelicula = async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get("id");
    const q = query(collection(db, "peliculas"), where("id", "==", idUrl));
    const querySnap = await getDocs(q);

    if (querySnap.empty) {
      console.error("No se encontró la película con id =", idUrl);
      return;
    }

    const pelicula = querySnap.docs[0].data();
    const contenedor = document.getElementById("contenido-interno");

    // Formatear fecha
    let fechaFormateada = "";
    if (pelicula.FechaEstreno) {
      const fechaEstreno = new Date(pelicula.FechaEstreno);
      const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
      fechaFormateada = fechaEstreno.toLocaleDateString("es-ES", opcionesFecha);
    }

    // Renderizar HTML
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
              <div class="celda">${pelicula.Geneross || pelicula.Genero || ""}</div>
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
        <embed src="https://www.youtube.com/v/${pelicula.Link}" 
               type="application/x-shockwave-flash" 
               allowscriptaccess="always" 
               allowfullscreen="true" 
               width="580" height="400">
      </div>
    `;
  } catch (error) {
    console.error("Error cargando detalles de la película:", error);
  }
};

getPelicula();