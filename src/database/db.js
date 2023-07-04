import { MongoClient, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

async function connectToDatabase(){
    try{
        await MongoClient.connect();
        db = MongoClient.db();
        console.log('Conectado ao banco de dados');
    }catch(err){
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

function getDatabase(){
    return db;
}

export { connectToDatabase, getDatabase };
