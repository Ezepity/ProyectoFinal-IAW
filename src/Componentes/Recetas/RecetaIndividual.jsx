import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RecetaFinal from "./RecetaFinal";

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
  },
  media: {
    height: 240,
  },
});

function RecetaIndividual({ recetita }) {
  const classes = useStyles();

  var urlId = "/" + recetita.img;

  const [itemNomCat, setItemNomCat] = useState([]);
  const idCatRec = recetita.id_categoria;
  const [err, setErr] = useState(null);


  return (
    <div>
      <center>
        {err != null && <h1>{err}</h1>}

        <ul>
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media} image={urlId} title={recetita.titulo} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {recetita.titulo}
                </Typography>
               
              </CardContent>
            </CardActionArea>
            <Link to={`/post/${recetita.id}`}>
              <Button size="small">Leer Mas</Button>
            </Link>
            <CardActions></CardActions>
          </Card>
        </ul>
      </center>
    </div>
  );
}

export default RecetaIndividual;
