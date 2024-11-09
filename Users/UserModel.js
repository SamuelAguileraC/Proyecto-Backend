const moongose = require('mongoose');

const UserSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permissions: {
        type: [String],
        enum: ['crear libros', 'modificar libros', 'modificar usuarios', 'inhabilitar libros', 'inhabilitar usuarios'],
        required: true
    },
    ReservedBooks: [
        {
            Book: {
                type: moongose.Schema.Types.ObjectId,
                ref: 'Book'
            },
            ReservationDate: {
                type: Date,
                default: Date.now

            },
            ReturnDate: {
                type: Date,
                default: Date.now
            }
        }
    ],
    Active: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    });

module.exports = moongose.model('User', UserSchema);