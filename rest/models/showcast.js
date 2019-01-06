const mongoose = require('mongoose');
const config = require('../../config');
const Schema = mongoose.Schema;

mongoose.connect(config.mongodb, { useNewUrlParser: true })

const ShowCastSchema = new Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, unique: false, required: true },
    cast: Array,
});

module.exports = mongoose.model('ShowCast', ShowCastSchema)