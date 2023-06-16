import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecetaIndividual from "./RecetaIndividual";
import styles from "./recetas.module.css";

function Recetas({ items }) {
  return (
    <>
      {items.map((item) => (
        <div key={item.id} className={styles.receta}>
          <RecetaIndividual recetita={item} />
        </div>
      ))}
    </>
  );
}

export default Recetas;
