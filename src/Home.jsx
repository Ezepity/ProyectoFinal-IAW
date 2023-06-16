import Recetas from "./Componentes/Recetas/Recetas";
import { useEffect, useState } from "react";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

 

  useEffect(() => {
    async function test(db) {
      const recetasCol = collection(db, "recetas");
      const recetasSnapshot = await getDocs(recetasCol);
      const recetaList = recetasSnapshot.docs.map((doc) => doc.data());
      setItems(recetaList);
    }

    test(db);
  }, []);

  return (
    <>
      <br></br><br></br>
      {err != null && <h1>{err}</h1>}
      {err == null && <Recetas items={items}></Recetas>}
    </>
  );
}

export default Home;
