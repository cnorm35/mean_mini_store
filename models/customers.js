var mongoose = require('mongoose');
// define the schema, ie the structure of how we want our MongoDB collections to look.  Using schemas allows all of the 
// documents within the same collection to have the same key names!  Hooray organization!

var CustomerSchema = new mongoose.Schema({
	name: String,
	created: {type: Date, default: new Date()}
});

CustomerSchema.path('name').required(true, "Customer name cannot be left blank.");

mongoose.model('Customer', CustomerSchema);
