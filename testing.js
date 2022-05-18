import { Temporal } from "@js-temporal/polyfill";

{
            const now = Temporal.Now.zonedDateTimeISO();
            let lastEntry;
            let lastDateMadeCurrent;
            let isDayOld;
            let todaysEntry;
                    lastEntry = await EntryModel.findOne({ isCurrent: true })
                    lastDateMadeCurrent = Temporal.ZonedDateTime.from(lastEntry.dateMadeCurrent);
                    isDayOld = lastDateMadeCurrent.until(now).days > 0;
                    console.log('error while fetching existing entry', error);
                // get now and the current entry's ZonedDateTime, then test they are a day apart
                console.log('isDayOld:', isDayOld)

                // if (isDayOld || !lastEntry) {
                //     if (lastEntry) {
                //         lastEntry.isCurrent = false;
                //         const entrySaved = await lastEntry.save();
                //         console.log('time for a new entry. updated lastEntry', entrySaved);
                //     }
                //     let newEntry = await EntryModel.findOne({ isNovel: true });
                //     // just grab a random one if there's nothing new 
                //     if (!newEntry) { newEntry = await EntryModel.findOne(); };
                //     newEntry.isCurrent = true;
                //     newEntry.dateMadeCurrent = now.toString();
                //     todaysEntry = await newEntry.save();
                //     console.log('updated todays entry. ', todaysEntry)
                // }
}