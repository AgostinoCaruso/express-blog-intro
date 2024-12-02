/**
 * Creiamo il nostro blog personale e giorno dopo giorno lo potremo arricchire con nuove funzionalità sulla base di quello che impareremo.
- Creiamo il progetto base con una rotta / che ritorna un testo semplice con scritto ”Server del mio blog”
- Creiamo un array dove inserire una lista di almeno 5 post, per ognuno indicare titolo, contenuto, immagine e tags (tags è un array di stringhe)
- Creiamo poi una rotta /bacheca che restituisca un oggetto json con la lista dei post e il conteggio, partendo da un array.
- Configuriamo gli asset statici sull’applicazione in modo che si possano visualizzare le immagini associate ad ogni post.
- Testare su postman
Bonus:
filtrare i dati sulla base di parametri in query string
 */

//server
const express = require("express"); //associare a variabile l'oggetto express
const server = express();
const PORT = 3000;
//other var
const { lista } = require("./data/lista.js");
server.use(express.static("public"));

//qua partendo dal port 3000 ho l'inizio del server
server.get("/", (req, res) => {
  res.send("<h1>Server del mio blog</h1>");
});

//qua dall'inizio aggiungo un path diverso che mi porta da un altra parte
server.get("/bacheca", (req, res) => {

  const objLista = {
    lista,
    num: lista.length,
  };
  
  res.json(objLista);
});

//ritorna l'oggetto tramite titolo
server.get("/bacheca/obj/:titolo", (req, res) => {
  let titolo = req.params.titolo;

  // Trova un post che include la stringa passata
  const post = lista.find((post) =>
    post.titolo.toLowerCase().includes(titolo.toLowerCase())
  );

  if (post) {

    res.json(post); // Usa sendFile per inviare l'immagine
  } else {

    res.status(404).send("Oggetto non trovato");
  }
});

//ritorna l'oggetto tramite index
server.get("/bacheca/index/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (index >= 0 && index < lista.length) {
    res.json(lista[index]);
  } else {
    res.status(404).send("Post per indice non trovato.");
  }
});

//ti printa tutti i titoli delle img dentro a lista
server.get("/img", (req, res) => {
  res.json(lista.map((post) => post.img));
});

//ti printa a schermo l'immagine del titolo collegata
server.get("/img/:titolo", (req, res) => {
  let titolo = req.params.titolo;

  // Trova un post che include la stringa passata
  const post = lista.find((post) =>
    post.titolo.toLowerCase().includes(titolo.toLowerCase())
  );

  if (post) {

    res.sendFile(post.img, { root: "./public" }); // Usa sendFile per inviare l'immagine
  } else {

    res.status(404).send("Immagine non trovata"); 
  }
});

//qua sto in ascolto per la porta 3000
server.listen(PORT, () => {
  console.log("Server del mio blog");
  console.log(`Server running on http://localhost:${PORT}`);
});
