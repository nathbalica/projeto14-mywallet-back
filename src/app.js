import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routers/indexRouter.js'


dotenv.config();

const app = express();
app.use(express.json())
app.use(cors())

app.use(routes);


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})