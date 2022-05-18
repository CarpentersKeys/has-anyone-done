import EntryModel from '../../models/entry';
import dbConnect from '../../lib/dbConnect';
import { Temporal } from '@js-temporal/polyfill';

export default async function handler(req, resp) {
    await dbConnect();
    const { method, body } = req;

    switch (method) {
        case 'GET':
            // try {
                const lastEntryArr = await EntryModel.find({ isCurrent: true })
                const now = Temporal.Now.zonedDateTime();
                const lastEntry = lastEntryArr[0];
                const lastDateMadeCurrent = Temporal.ZonedDateTime.from(lastEntry.dateMadeCurrent);
                const isDayOld = lastDateMadeCurrent.until(now).days > 0;
                // get now and the current entry's ZonedDateTime, then test they are a day apart
                console.log('isDayOld:', isDayOld)

                if (lastEntryArr.length > 0) {
                    if (!lastEntryArr.length === 1) {
                        // handle cases where there are more than one entry somehow
                        const updateExtras = lastEntry.slice(1).map(e => e.isCurrent = false);
                        const entriesSaved = await updateExtras.save();
                        console.log('there were extra entries set to current but they were reset. ', entriesSaved)
                    }
                }

                if (isDayOld || true) {
                    lastEntry.isCurrent = false;
                    const entrySaved = await lastEntry.save();
                    console.log('time for a new entry. updated lastEntry', entrySaved);
                    let newEntry = await EntryModel.findOne({ isNovel: true });
                    // just grab a random one if there's nothing new 
                    if (!newEntry) { newEntry = await EntryModel.findOne(); };
                    newEntry.isCurrent = true;
                    newEntry.dateMadeCurrent = now.toString();
                    const todaysEntry = await newEntry.save();
                    console.log('updated todays entry. ', todaysEntry)
                }

                resp.status(200).json({ success: true, todaysEntry })
            // } catch (error) {
            //     resp.status(400).json({ success: false, error })
            // }
            break
        case 'POST':
            try {
                const text = req.body.text;
                EntryModel.create({
                    text,
                    isNovel: true,
                    isCurrent: false,
                })
                    .then(() => {
                        resp.send(JSON.stringify('success'));
                    })
                    .catch(err => console.log('error while submitting entry:', err))
            } catch (error) {
                resp.status(400).json({ success: false })
            }
            break
    }

}