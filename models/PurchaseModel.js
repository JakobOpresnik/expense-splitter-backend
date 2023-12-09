var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PurchaseSchema = new Schema({
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
	 	ref: 'User',
		required: true,
	},
	'group' : {
		type: Schema.Types.ObjectId,
		ref: 'Group',
		required: true,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
//module.exports = PurchaseSchema