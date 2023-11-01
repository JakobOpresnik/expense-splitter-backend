var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GroupSchema = new Schema({
	'name' : {
		type: String,
		required: true
	},
	'people' : {
		type: Number,
		required: true
	},
	'users' : {
	 	type: [Schema.Types.ObjectId],
	 	ref: 'User',
		required: false
	},
	'purchases' : {
		type: [Schema.Types.ObjectId],
		ref: 'Purchase',
		required: false
	},
	'transactions' : {
		type: Number,
		required: false
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);
