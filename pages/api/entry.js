import EntryModel from '../../models/EntryModel';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, resp) {
    const db = await dbConnect();
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
        return resp.json({
            message: 'successfully created new entry: ',
            newEntry,
        });
    } catch (error) {
        if (error.keyPattern.text === 1) {
            return resp.status(400).json({
                success: false,
                message: 'duplicate submission',
            });
        };
        console.log(error);
        return resp.status(400).json({
            success: false,
            messaage: 'unhandled error, check server logs',
            error,
        })
    }
}