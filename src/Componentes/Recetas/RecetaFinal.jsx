import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { db } from "../../services/firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

import styles from "./recetafinal.module.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 400,
  },
});

function RecetaFinal() {
  const [item, setItem] = useState([]);
  const [ImagenRec, setImagenRec] = useState([]);
  const location = useLocation();
  const idRec = location.pathname.split("/")[2];
  const [err, setErr] = useState(null);
  const [nombreCatRec, setnombreCatRec] = useState(null);
  const [itemCat, setItemCat] = useState([]);

  useEffect(() => {
    async function getReceta(db) {
      const recetasRef = collection(db, "recetas");
      const q = query(recetasRef, where("id", "==", Number(idRec)));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setItem(doc.data());
      });
    }

    getReceta(db);
  }, []);

  const classes = useStyles();

  var urlId = "/" + item.img;

  return (
    <div>
      <center>
        {err != null && <h1>{err}</h1>}

        {
          <div className={styles.receta}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia className={classes.media} image={urlId} title={item.titulo} />

                <CardContent>
                  <Typography gutterBottom variant="h3" component="h2">
                    <h3 className="bold"> {item.titulo}</h3>
                  </Typography>
                  <Typography gutterBottom component="h3">
                    <br />
                    {/* <b>Nombre categoria:</b> <NombreCategoria idCatRec={it.id_categoria}></NombreCategoria> */}
                    <h2>Categoria: {item.categoria}</h2>
                  </Typography>
                  <Typography componen="h4" /* variant="body3" */ color="textSecondary" component="p">
                    {item.instrucciones}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions></CardActions>
            </Card>
          </div>
        }
      </center>
    </div>
  );
}

export default withRouter(RecetaFinal);
