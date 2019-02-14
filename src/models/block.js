const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const BlockSchema = new Schema({
	blockId: String,
	blockStyles: Object
})

module.exports = mongoose.model('Block', BlockSchema);