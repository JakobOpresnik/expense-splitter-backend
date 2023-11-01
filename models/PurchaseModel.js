var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PurchaseSchema = new Schema({
	'id' : {
		type: String,
		required: true
	},
	'name' : {
		type: String,
		required: true
	},
	'cost' : {
		type: Number,
		required: true
	},
	'user' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
//module.exports = PurchaseSchema