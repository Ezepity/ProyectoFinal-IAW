import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Recetas from './Recetas';
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";

function Categoria() {

  const [err, setErr] = useState(null);
  const [itemsCatRec, setItemsCatRec] = useState([]);
  console.log("Estoy en Categoria");
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  
 

  useEffect(() => {

    async function recetasPorCategoria() {
      const q = collection(db, "recetas");
      const qq = query(q, where("categoria", "==", cat));
      const querySnapshot = await getDocs(qq);
      const recetaList = querySnapshot.docs.map((doc) => doc.data());

      setItemsCatRec(recetaList);
    }
    recetasPorCategoria();
  
}, [setItemsCatRec]);

  return (
   
    <>
       <br></br>    
       <p className='bold'>➡️{cat}</p>
       <br></br>
      {
        err != null && <h1>{err}</h1>
      }

      { err == null && <Recetas items={itemsCatRec}></Recetas> }
    </>

  );

}

export default Categoria;