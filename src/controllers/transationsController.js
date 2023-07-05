import { db } from "../database/db.js";
import dayjs from 'dayjs';
import { ObjectId } from "mongodb";

export async function createTransaction(req, res) {
    const { value, description, type } = req.body;
    const { userId } = res.locals.session;

    try {
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

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function getTransaction(req, res) {
    const { userId } = res.locals.session;

    try {
        const transactions = await db
            .collection("transactions")
            .find({ userId })
            .sort({ date: -1 })
            .toArray()

        res.send(transactions)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteTransaction(req, res) {
    const { userId } = res.locals.session;
    const { id } = req.params;
    if (!id) return sendStatus(404);

    try {
        const deleteData = await db
            .collection("transactions")
            .deleteOne({ _id: new ObjectId(id), userId })
        if (deleteData.deletedCount === 0) return sendStatus(404)

        res.sendStatus(202)

    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function updateTransaction(req, res) {
    const { value, description } = req.body;
    const { userId } = res.locals.session;
    const { id } = req.params;
    if (!id) return sendStatus(404);

    try {
        const floatValue = parseFloat(value);

        if (isNaN(floatValue) || floatValue <= 0) {
            return res.status(422).json({ error: "O valor deve ser um número de ponto flutuante positivo." });
        }
        const updateData = await db
            .collection("transactions")
            .updateOne({ _id: new ObjectId(id) }, { $set: { value: floatValue, description }}, userId)

        if(updateData.matchedCount === 0) return res.sendStatus(404);

        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message);
    }

}