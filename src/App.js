import TopBar from "./Componentes/TopBar/TopBar";
import RecetaFinal from "./Componentes/Recetas/RecetaFinal";
import Categoria from "./Componentes/Recetas/Categoria";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import FiltrarRecetas from "./Componentes/TopBar/FiltrarRecetas";
import ImagenLogo from "./Componentes/Imagenes/ImagenLogo";

import React, { useState } from "react";
import axios from "axios";
import obtenerClima from "./utils/clima";
import RecetasPorCiudad from "./Componentes/Recetas/RecetasPorCiudad";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <TopBar></TopBar>
          <ImagenLogo></ImagenLogo>
          <Home></Home>
        </Route>

        <Route path="/post/:id" component={RecetaFinal}>
          <TopBar></TopBar>
          <RecetaFinal></RecetaFinal>
        </Route>

        <Route path="/recomendadas/:ciudad" component={RecetasPorCiudad}>
          <TopBar></TopBar>
          <RecetasPorCiudad></RecetasPorCiudad>
        </Route>

        <Route path="/categoria/:id" component={Categoria}>
          <TopBar></TopBar>
          <Categoria></Categoria>
        </Route>

        <Route path="/busqueda/:texto" component={FiltrarRecetas}>
          <TopBar></TopBar>
          <FiltrarRecetas></FiltrarRecetas>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
