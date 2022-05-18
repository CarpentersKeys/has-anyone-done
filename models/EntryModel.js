import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'please enter a string for the text'],
        maxlength: [280, 'too long for twitter, too long for us'],
        // this isn't a validator
        unique: true,
    },
    isNovel: {
        type: Boolean,
        required: [true, 'please enter a isNovel: \'true\' for a new entry'],
    },
    isCurrent: {
        type: Boolean,
        required: [true, 'please enter isCurrent: \'false\' for a new entry'],
    },
    dateMadeCurrent: {
        // just using a string because temporal
        // Temporal.Now.zonedDateTimeISO().toString()
        // tz Canada/Eastern
        type: String,
        required: false,
    }
}, { timestamps: true })

export default mongoose.models.EntryModel || mongoose.model('EntryModel', entrySchema);
