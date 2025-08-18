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

const getCine = async () => {
  const params = new URLSearchParams(window.location.search);
  const idUrl = params.get("id");
  try {
    const q = query(collection(db, "cines"), where("id", "==", idUrl));
    const querySnap = await getDocs(q);

    if (!querySnap.empty) {
      const cineDoc = querySnap.docs[0];
      const cine = cineDoc.data();

      const contenedor = document.getElementById("contenido-interno");

      contenedor.innerHTML = `
        <h2>${cine.RazonSocial}</h2>
        <div class="cine-info">
          <div class="cine-info datos">
            <p>${cine.Direccion} - ${cine.Ciudad}</p>
            <p>Teléfono: ${cine.Telefonos} anexo 865</p>
            <br/>
            <div class="tabla"> 
            <div class="fila"> 
            <div class="celda-titulo">Lunes y Miércoles</div> 
            <div class="celda">S/. 4.00</div>
            </div>
            <div class="fila impar"> 
            <div class="celda-titulo">Martes</div>
            <div class="celda">S/. 3.50</div> 
            </div> 
            <div class="fila"> 
            <div class="celda-titulo">Jueves y Viernes</div> 
            <div class="celda">S/. 6.50</div> 
            </div> 
            <div class="fila impar"> 
            <div class="celda-titulo">Sábado, Domingo y Feriados</div> 
            <div class="celda">S/. 7.50</div> </div> 
            <div class="fila"> 
            <div class="celda-titulo">Adulto mayor y niños hasta 8 años (sábados, domingos y feriados)</div> 
            <div class="celda">S/. 4.00</div> 
            </div> <div class="fila impar"> 
            <div class="celda-titulo">3D - Lunes y Miércoles</div> 
            <div class="celda">S/. 7.50</div> 
            </div> <div class="fila"> 
            <div class="celda-titulo">3D - Martes</div>
            <div class="celda">S/. 6.00</div> 
            </div> <div class="fila impar"> 
            <div class="celda-titulo">3D - Jueves a Domingo y Feriados</div> 
            <div class="celda">S/. 11.00</div>
             </div>
             </div>
            
            
            <div class="aviso">
              <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00
                 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya
                 para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño,
                 Tumbes y Tacna.</p>
            </div>
          </div>
          <img src="img/cine/${cine.id}.2.jpg"/>
          <br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
          <div class="cine-info peliculas">
            <div class="tabla">
              <div class="fila">
                <div class="celda-cabecera">Películas</div>
                <div class="celda-cabecera">Horarios</div>
              </div>
              <div class="fila impar"> <div class="celda-titulo">GUERRERO</div> <div class="celda">13:00 / 13:30 / 14:00 / 15:00 / 15:30 / 16:00 / 17:00 / 17:30 / 18:00 / 19:00 / 20:00 / 21:00 / 21:55</div> </div> <div class="fila"> <div class="celda-titulo">LA LEYENDA DE LA BELLA DURMIENTE</div> <div class="celda">19:45 / 21:30</div> </div> <div class="fila impar"> <div class="celda-titulo">ROGUE ONE</div> <div class="celda">13:00 / 14:00 / 15:30 / 16:30 / 18:00 / 19:00 / 19:30 / 20:30 / 21:30 / 21:55</div> </div> <div class="fila"> <div class="celda-titulo">MOANA</div> <div class="celda">13:00 / 15:15 / 17:30</div> </div>
            </div>
          </div>
        </div>
        <div>
          <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
          <span class="tx_gris">
            Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
            Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
            <br/><br/>
            Visitános y diviértete con nosotros. 
            <br/><br/>
            <b>CINESTAR</b>, siempre pensando en ti. 
          </span>		
        </div>
      `;
    } else {
      console.error("No se encontró el cine con id =", idUrl);
    }
  } catch (error) {
    console.error("Error al obtener el cine:", error);
  }
};

getCine();