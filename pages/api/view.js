import EntryModel from '../../models/EntryModel';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, resp) {
    await dbConnect();
    const { method } = req;
    if (method !== 'GET') { return; };

    try {
        const entries = await EntryModel.find({}).sort('-createdAt');
        return resp.status(200).json({ success: true, entries })
    } catch (error) {
        return resp.status(400).json({ success: false, error })
    }
}