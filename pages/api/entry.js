import EntryModel from '../../models/EntryModel';
import dbConnect from '../../lib/dbConnect';
import { Temporal } from '@js-temporal/polyfill';

export default async function handler(req, resp) {
    await dbConnect();
    const { method, body } = req;

    switch (method) {
        case 'GET':
            const now = Temporal.Now.zonedDateTimeISO();
            let lastEntry;
            let lastDateMadeCurrent;
            let isFresh;
            let newEntry
            try {
                lastEntry = await EntryModel.findOne({ isCurrent: true })
                console.log('populated:', lastEntry?.populated('dateMadeCurrent'))
                if (lastEntry) {
                    if (lastEntry?.populated('dateMadeCurrent')) {
                        lastDateMadeCurrent = Temporal.ZonedDateTime.from(lastEntry.dateMadeCurrent);
                        isFresh = lastDateMadeCurrent.until(now).days < 1;
                    }
                    // entry still fresh, return
                    if (lastEntry && isFresh) { return resp.json('old entry still valid'); };
                    // entry is stale
                    lastEntry.isCurrent = false;
                    const entrySaved = await lastEntry.save();
                    // console.log('time for a new entry. updated lastEntry', entrySaved);
                } else { console.log('no last entry') }

                // should enter if !isFresh || !lastEntry
                newEntry = await EntryModel.findOne({ isNovel: true });
                if (!newEntry) {
                    const oldEntries = await EntryModel.find({}).sort({updatedAt: 1});
                    console.log('old entries', oldEntries)
                    newEntry = oldEntries[0];
                }
                // just grab a random one if there's nothing new 
                const updated = await newEntry.updateOne({
                    isCurrent: true,
                    isNovel: false,
                    dateMadeCurrent: now.toString(),
                });

                return resp.status(200).json({ success: true, newEntry })
            } catch (error) {
                console.log('GET error: ', error)
                return resp.status(400).json({ success: false, error })
            }
            break
        case 'POST':
            try {
                const { text } = body;
                const newEntry = await EntryModel.create({
                    text,
                    isNovel: true,
                    isCurrent: false,
                })
                return resp.send(JSON.stringify('successfully created new entry: ', newEntry));
            } catch (error) {
                return resp.status(400).json({ success: false })
            }
            break
    }

}