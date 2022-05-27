import EntryModel from '../../models/EntryModel';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, resp) {
    const db = await dbConnect();
    console.log(db)
    const { method, body } = req;

    if (method !== 'POST') {
        return resp.status(400).json({
            success: false,
            message: 'only post requests on this route'
        })
    }
    try {
        const { text } = body;
        const newEntry = await EntryModel.create({
            text,
            isNovel: true,
            isCurrent: false,
        })
        // just resp.json
        return resp.send(JSON.stringify('successfully created new entry: ', newEntry));
    } catch (error) {
        return resp.status(400).json({ success: false })
    }
}