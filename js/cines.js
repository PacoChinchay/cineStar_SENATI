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


const getCines = async () => {
  // const res = await fetch("http://localhost/cinestar_sweb_php/cines");
  // const json = await res.json();

  const snap = await getDocs(collection(db, "cines"));

  const contenedor = document.getElementById("contenido-interno");
  contenedor.innerHTML = `<br /><h1>Nuestros Cines</h1><br />`;

  snap.forEach(cine => {
    const c = cine.data();
    const html = `
        <div class="contenido-cine">
          <img src="img/cine/${c.id}.1.jpg" width="227" height="170" />
          <div class="datos-cine">
            <h4>${c.RazonSocial}</h4><br />
            <span>${c.Direccion} - ${c.Ciudad}<br /><br />Teléfono: ${c.Telefonos}</span>
          </div>
          <br />
          <a href="cine.html?&id=${c.id}">
            <img src="img/varios/ico-info2.png" width="150" height="40" />
          </a>
        </div>
      `;

    contenedor.innerHTML += html;
  });
}

getCines();
