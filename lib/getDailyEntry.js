import EntryModel from '../models/EntryModel';
import dbConnect from '../lib/dbConnect';
import { Temporal } from '@js-temporal/polyfill';

export default async function getDailyEntry() {
    await dbConnect();

    let lastEntry;
    let newEntry

    let tomorrow 
    // uncomment tmrw to test
    // tomorrow = Temporal.Now.zonedDateTimeISO('America/Toronto').add({ days: 1, minutes: 20 })

    console.log(tomorrow);

    const now = Temporal.Now.zonedDateTimeISO('America/Toronto');
    let lastDateMadeCurrent;
    let since
    let daysSince
    let isFresh;
    let freshEntry;

    lastEntry = await EntryModel.findOne({ isCurrent: true })
    if (lastEntry) {
        if (lastEntry.dateMadeCurrent) {
            lastDateMadeCurrent = Temporal.ZonedDateTime
                .from(lastEntry.dateMadeCurrent)
                .round({
                    roundingMode: 'floor',
                    smallestUnit: 'day',
                });

            const current = tomorrow || now
            since = current.since(lastDateMadeCurrent).round({ largestUnit: 'day' })
            daysSince = since.days
            isFresh = daysSince < 1;
        }
        // entry still fresh, return
        if (lastEntry && isFresh) { return freshEntry = lastEntry; };
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

    return freshEntry = newEntry;
}