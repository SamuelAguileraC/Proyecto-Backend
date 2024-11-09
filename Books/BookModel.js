const moongose = require('mongoose');


const BookSchema = new moongose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },

},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = moongose.model('Book', BookSchema);

