const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hodlinfo');

const HodlSchema = new mongoose.Schema({
    name : String,
    last : Number,
    buy : Number,
    sell : Number,
    volume : Number,
    base_unit : String,
    done_at : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('HodlSchema', HodlSchema);