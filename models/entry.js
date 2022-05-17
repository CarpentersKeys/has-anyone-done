import mongoose from 'mongoose';

    const entrySchema = new mongoose.Schema({
        text: String,
        novel: Boolean,
    }, { timestamps: true })

    export const EntryModel = mongoose.model('EntryModel', entrySchema);
