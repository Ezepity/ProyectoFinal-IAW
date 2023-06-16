import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import XMLParser from "react-xml-parser";

import styles from "./topbar.module.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function TopBar() {
  const history = useHistory();

  const classes = useStyles();
  const [itemsCategorias, setItemsCategorias] = useState([]);
  const [ciudadIngresada, setCiudadIngresada] = useState();
  const [itemsRecetas, setItemsRecetas] = useState([]);
  const [checked, setChecked] = React.useState([0]);
  const [value, setValue] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [err, setErr] = useState(null);

  const [temp, setTemp] = useState();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Consulto todas las categorias
  useEffect(() => {
      async function obtenerCategorias(db) {
        const q = collection(db, "recetas");
        const qq = query(q, where("categoria", "==", true));
        const querySnapshot = await getDocs(q);
        const recetaList = querySnapshot.docs.map((doc) => doc.data());
        const categoriassUnicas = recetaList.filter((doc, index, self) =>
        index === self.findIndex(d => d.categoria === doc.categoria)
);
        setItemsCategorias(categoriassUnicas);
      }
      obtenerCategorias(db);
    
  }, []);




  const resultadosPorCiudad = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadIngresada}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

    await axios
      .get(url)
      .then((response) => {
        setTemp(response.data.main.temp);
        
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
        alert("No se encontró la ubicación ingresada");
      });
  };

  useEffect(() => {
    if (temp){
      history.push({
        pathname: `/recomendadas/${ciudadIngresada}`,
        state: { ciudad: ciudadIngresada, temp: temp },
      });
      refreshPage()}
  }, [temp]);

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      {err != null && <h1>{err}</h1>}

      <ul>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.root} >
                <Link to={`/`}>
                  <IconButton color="secondary">
                    <h2>Recetas caseras de eze</h2>
                  </IconButton>
                </Link>
              </Typography>
              
              
              {/*SECCION RECOMENDACION DE RECETAS POR CLIMA DE CIUDAD INGRESADA
               ///////////////////////////////////////////////////////////////*/}
               
              <div style={{ width: 400 }} className="search">
                <Autocomplete
                  freeSolo
                  id="search-by-city"
                  disableClearable
                  value={value}
                  margin="normal"
                  onInputChange={(event, newValue) => {
                    if (newValue) {
                      setCiudadIngresada(newValue);
                      setTitle(newValue.title);
                    }
                    
                  }}
                  options={itemsRecetas.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ingrese una ubicación para recomendar recetas"
                      margin="normal"
                      variant="outlined"
                      onKeyDown={e =>{
                        if (e.key == 'Enter' && e.target.value){
                          resultadosPorCiudad();
                        }
                      }}
                      InputProps={{ ...params.InputProps, type: "search" }}
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {

                    resultadosPorCiudad();

                  }}
                >
                  Buscar
                </Button>
                
              </div>
              

              {/////////////////////////////////////
              /*MENU POPUP CON CATEGORIAS A ELEGIR*/}
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button style={{ width: 200 , margin: 40 , marginRight:50 }} variant="contained" color="secondary" {...bindTrigger(popupState)}>
                      CATEGORIAS
                    </Button>
                    <Menu {...bindMenu(popupState)} >
                      {itemsCategorias.map((itemCat, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            window.location.href = `/categoria/${itemCat.categoria}`;
                          }}
                        >
                          {itemCat.categoria}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>


              {/* TEXTO A BUSCAR EN LAS RECETAS*/}
              <div style={{ width: 500 }} className="search">
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  value={value}
                  margin="normal"
                  onInputChange={(event, newValue) => {
                    if (newValue) {
                      setTitle(newValue);
                    }
                  }}
                  options={itemsRecetas.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ingrese busqueda..."
                      margin="normal"
                      variant="outlined"
                      onKeyDown={e =>{
                        if (e.key == 'Enter' && e.target.value){
                          window.location.href = `/busqueda/${title.toLowerCase()}`;
                        }
                      }}
                      InputProps={{ ...params.InputProps, type: "search" }}
                    />
                    
                  )}
                />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    window.location.href = `/busqueda/${title.toLowerCase()}`;
                  }}
                >
                  Buscar
                </Button>

                

              </div>
            </Toolbar>
          </AppBar>
        </div>
      </ul>
    </div>
  );
}
