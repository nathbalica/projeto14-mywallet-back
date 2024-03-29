import { db } from "../database/db.js";

export async function validateAuthentication(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.sendStatus(401);

    try{
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.sendStatus(401);
    
        res.locals.session = session;
    
        next();
    }catch(err){
        res.status(500).send(err.message);
    }

}