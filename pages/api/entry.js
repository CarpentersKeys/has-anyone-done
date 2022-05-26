import EntryModel from '../../models/EntryModel';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, resp) {
    await dbConnect();
    const { method, body } = req;

    switch (method) {
        case 'POST':
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
            break
    }
}