import { db } from "../database/db.js";
import dayjs from 'dayjs';

export async function createTransaction(req, res){
    const { value, description, type } = req.body;
    const { userId } = res.locals.session;

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);    

    try{
        const floatValue = parseFloat(value);

        if (isNaN(floatValue) || floatValue <= 0) {
          return res.status(422).json({ error: "O valor deve ser um número de ponto flutuante positivo." });
        }

        await db.collection("transactions").insertOne({
          value: floatValue,
          description,
          type,
          userId,
          date: dayjs().valueOf()
        });
    
        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message);
    }

}

