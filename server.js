import express from "express";
import "dotenv/config";
//If your route file does export default router, then import like:
//Because default exports are imported without {}.
import  contactsRoutes from './routes/contact-routes.js';
import { errorHandler } from "./middleware/error-handler.js";
import { connectionDb } from "./config/db-connection.js";

connectionDb();
const app = express();
//vai pegar do .env e se nao tiver, 3333
const PORT = process.env.PORT || 3333;

// ✅ Primeiro: middlewares e rotas, vamos usar um middleware

/*built-in middleware Automatically parses incoming 
requests with JSON payloads and puts the result in req.body.
Without express.json(), Express won't know how to read this 
body, and req.body will be undefined.
*/
app.use(express.json());

//rotas
app.use('/api/contacts', contactsRoutes);

//error handler, custom middleware
app.use(errorHandler);


// ✅ Por último: iniciar o servidor
/*Se você colocar .listen() antes de definir rotas, 
o servidor começa a aceitar requisições antes de saber
como lidar com elas.*/
//o aplicativo ira escutar a porta e retornar uma callback
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});