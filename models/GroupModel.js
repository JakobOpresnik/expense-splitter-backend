var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GroupSchema = new Schema({
	'name' : {
		type: String,
		required: true
	},
	'people' : {
		type: Number,
		required: true,
	},
	'users' : {
	 	type: [Schema.Types.ObjectId],
	 	ref: 'User',
		required: false,
		default: [],
	},
	'purchases' : {
		type: [Schema.Types.ObjectId],
		ref: 'Purchase',
		required: false,
		default: [],
	},
	'transactions' : {
		type: Number,
		required: false,
		default: 0,
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);
