import mongoose from "mongoose";
import { Entry } from "../../models/entry";

export default function handler(req, resp) {
    console.log('can I even log')
    const text = req.body.text;
    resp.send('sup')

    // (function tryConnectTwice(tried = false) {
    // return mongoose.connect(process.env.MDB_CONNECT_STRING)
    // .catch(err => {
    //     console.log(`connection to mdb failed. first attempt: ${tried}\nerror:`, err);
    //     if (!tried) { return tryConnectTwice(true); };
    //     return err;
    // });
    // }())

    // mongoose.connect(process.env.MDB_CONNECT_STRING)
    //     .then(() => {
    //         console.log('gets to create')
    //         Entry.create({
    //             text,
    //             novel: true
    //         })
            // .then((resolver) => {
            //     console.log(resolver)
            //     const jsonPack = JSON.stringify({ resolver: 'reqkJ' })
            //     resp.json(jsonPack);
            // })
            // .catch(err => console.log('error while submitting entry:', err))
        // })
}