import mongoose from "mongoose";
// import { EntryModel } from "../../models/entry";

export default async function handler(req, resp) {
    const text = req.body.text;
    console.log(text)
    const connection = await mongoose.createConnection(process.env.MDB_CONNECT_STRING)
        .asPromise();

    const entrySchema = new mongoose.Schema({
        text: String,
        novel: Boolean,
    }, { timestamps: true })

    const EntryModel = connection.model('EntryModel', entrySchema);

    EntryModel.create({
        text,
        novel: true
    })
        .then((resolver) => {
            console.log(resolver)
            const jsonPack = JSON.stringify({ resolver: 'reqkJ' })
            resp.json(jsonPack);
        })
        .catch(err => console.log('error while submitting entry:', err))
}