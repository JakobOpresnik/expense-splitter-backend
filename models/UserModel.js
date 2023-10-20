var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	'username': {
		type: String,
		required: true
	},
	'password': {
		type: String,
		required: true
	},
	'email': {
		type: String,
		required: true
	},
	'balance': {
		type: Number,
		required: true,
		default: 0
	},
	
	'token': {
		type: Boolean,
		required: false,
		default: ''
	}
}, {
	timestamps: true
});

// const User = mongoose.model('User', UserSchema);
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;