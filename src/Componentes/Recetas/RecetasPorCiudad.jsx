import React, { useState, useEffect } from "react";
import RecetaIndividual from "./RecetaIndividual";
import styles from "./recetas.module.css";
import { useLocation } from "react-router-dom";
import { db } from "../../services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import obtenerClima from "../../utils/clima";
import axios from "axios";
import { LineWeight } from "@material-ui/icons";


function RecetasPorCiudad() {
  const [items, setItems] = useState([]);
  const [temp, setTemp] = useState();
  const [clima, setClima] = useState();
  const location = useLocation();
  const ciudad = location.pathname.split("/")[2];
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  useEffect(() => {
    if (location.state) setClima(obtenerClima(location.state.temp));
  }, []);


  useEffect(() => {
    if (clima) {
      async function obtenerRecetas(db) {
        const q = query(collection(db, "recetas"), where("temperatura", "==", clima));
        const querySnapshot = await getDocs(q);
        const recetaList = querySnapshot.docs.map((doc) => doc.data());

        setItems(recetaList);
      }
      obtenerRecetas(db);
    //Si clima no está seteado
    } else {
      async function testUrl() {
        await axios
          .get(url)
          .then((response) => {
            setTemp(response.data.main.temp);
          })
          .catch((error) => {
            alert("✋❌ No se encontró la ubicación ingresada");
            
          });
      }
      testUrl();
    }
  }, [clima]);
  

  useEffect(() => {
    setClima(obtenerClima(temp));
  }, [temp]);

  const textoAzul = {
    color: 'blue',
  };

  const textoGold = {
    color: 'gold',
  };

  return (
    <>
      {location.state ? (
        <div>
          <center>
          
          <p className= "bold" style={textoAzul}>RECETAS RECOMENDADAS SEGUN EL CLIMA EN TU CIUDAD</p>
          <br></br>
          <p className="bold" style={textoGold}> ➡️ Ciudad: {location.state.ciudad.charAt(0).toUpperCase()+ location.state.ciudad.slice(1)}</p>
          <p className="bold" style={textoGold}> ➡️ Temperatura: {location.state.temp} °C</p>
          <p className="bold" style={textoGold}> ➡️ Clima: {(clima != undefined && clima != "Temperatura fuera de rango") ? (`${clima}`) : ("")}</p>
          <br></br>
          </center>
       
        </div>
        ):(<div>
          <center>
          
          <p className= "bold" style={textoAzul}>RECETAS RECOMENDADAS SEGUN EL CLIMA EN TU CIUDAD</p>
          <br></br>
          <p className="bold" style={textoGold}> ➡️ Ciudad: {ciudad.charAt(0).toUpperCase()+ ciudad.slice(1)}</p>
          <p className="bold" style={textoGold}> ➡️ Temperatura: {temp}</p>
          <p className="bold" style={textoGold}> ➡️ Clima: {(clima != undefined && clima != "Temperatura fuera de rango") ? (`${clima}`) : ("")}</p>
          <br></br>
          </center>
        </div>
      )}

      {items.map((item) => (
        <div key={item.id} className={styles.receta}>
          <RecetaIndividual recetita={item} />
        </div>
      ))}
    </>
  );
}

export default RecetasPorCiudad;
