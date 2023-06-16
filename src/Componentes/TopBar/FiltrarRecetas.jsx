import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Recetas from "../Recetas/Recetas";
import { collection, getDocs, query, where } from "firebase/firestore";
import axios from "axios";
import { db } from "../../services/firebase";
import { FormatAlignCenter, FormatAlignCenterOutlined } from "@material-ui/icons";

function FiltrarRecetas() {
  const [items, setItems] = useState([]);
  const [itemAFiltrar, setItemAFiltrar] = useState([]);
  const [err, setErr] = useState(null);
  const [texto, setTexto] = useState();
  const location = useLocation();
  const txt = location.pathname.split("/")[2];
  

//////////////////////////////////////
//PROBANDO FILTRAR RECETAS POR TEXTO//
//////////////////////////////////////

useEffect(() => {
    async function obtenerRecetas(db) {
      const q = collection(db, "recetas");
      const querySnapshot = await getDocs(q);
      const recetaList = querySnapshot.docs.map((doc) => doc.data());

      //PRUEBA TXT EN CADA TITULO
      const resultadosFiltrados = [];
      const searchResults =
        recetaList.forEach((recetita) => {
          // Verifico si la cadena de texto contiene la búsqueda txt
          if (recetita.titulo.toLowerCase().includes(txt.toLowerCase())) {
            resultadosFiltrados.push(recetita);
          }
        });

      // Actualizar el estado con los resultados
      if(resultadosFiltrados.length == 0){
        alert(" ✋❌ No se encontraron resultados para tu búsqueda", FormatAlignCenterOutlined);
      }

      setItems(resultadosFiltrados);
    }
    obtenerRecetas(db);
  
}, []);





  return (
    <>
      <center>
        {err != null && <h1>{err}</h1>}

        {err == null && <Recetas items={items}></Recetas>}
      </center>
    </>
  );
}


export default FiltrarRecetas;
