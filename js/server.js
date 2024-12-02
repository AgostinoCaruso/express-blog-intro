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

const express = require("express");//associare a variabile l'oggetto express
const server = express();
const PORT = 3000;

server.get("/",(req,res)=>{
    res.send("<h1>Server del mio blog</h1>");
});

server.listen(PORT,()=>{
    console.log("Server del mio blog");
    console.log(`Server running on http://localhost:${PORT}`);
});