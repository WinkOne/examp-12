const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        required: true
    },
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;