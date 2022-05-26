import EntryModel from '../../models/EntryModel';
import dbConnect from '../../lib/dbConnect';
import { Temporal } from '@js-temporal/polyfill';

export default async function handler(req, resp) {
    await dbConnect();
    const { method, body } = req;

    switch (method) {
        case 'GET':
            let lastEntry;
            let newEntry

            // yesterday for testing
            // const yesterday = Temporal.Now.zonedDateTimeISO().subtract({ days: 1, minutes: 20 })
            const now = Temporal.Now.zonedDateTimeISO();
            let lastDateMadeCurrent;
            let since
            let daysSince
            let isFresh;

            try {
                lastEntry = await EntryModel.findOne({ isCurrent: true })
                if (lastEntry) {
                    if (lastEntry.dateMadeCurrent) {
                        lastDateMadeCurrent = Temporal.ZonedDateTime
                            .from(lastEntry.dateMadeCurrent)
                            .round({
                                roundingMode: 'floor',
                                smallestUnit: 'day',
                            });
                        since = now.since(lastDateMadeCurrent).round({ largestUnit: 'day' })
                        daysSince = since.days
                        isFresh = daysSince < 1;
                    }
                    // entry still fresh, return
                    if (lastEntry && isFresh) { return resp.json({ success: true, lastEntry }); };
                    // entry is stale
                    lastEntry.isCurrent = false;
                    const entrySaved = await lastEntry.save();
                    // console.log('time for a new entry. updated lastEntry', entrySaved);
                } else { throw new Error('no last entry'); };

                // should enter if !isFresh || !lastEntry
                newEntry = await EntryModel.findOne({ isNovel: true });
                if (!newEntry) {
                    const oldEntries = await EntryModel.find({}).sort({ updatedAt: 1 });
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
                // just resp.json
                return resp.send(JSON.stringify('successfully created new entry: ', newEntry));
            } catch (error) {
                return resp.status(400).json({ success: false })
            }
            break
    }

}