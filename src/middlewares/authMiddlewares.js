import { authSchema } from '../schemas/validationsAuth.js'
import { stripHtml } from 'string-strip-html'

export async function validateUser(req, res, next){
    const { name, email, password } = req.body;

    const cleanUser = {
        name: typeof name === "string" && stripHtml(name).result.trim(),
        email: typeof email === "string" && stripHtml(email).result.trim(),
        password: typeof password === "string" && stripHtml(password).result.trim()
        
    }

    const { error } = authSchema.validate(cleanUser, {abortEarly: false})
    if (error) {
        return res.status(422).json({ error: error.details.map(detail => detail.message) });
    }

    next();
}