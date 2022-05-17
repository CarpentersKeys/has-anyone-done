import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
    text: String,
    novel: Boolean,
}, { timestamps: true })

export const Entry = mongoose.model('Entry', entrySchema);