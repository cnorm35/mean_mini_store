var mongoose = require('mongoose');
// define the schema, ie the structure of how we want our MongoDB collections to look.  Using schemas allows all of the 
// documents within the same collection to have the same key names!  Hooray organization!

var OrderSchema = new mongoose.Schema({
	name: String,
	product: String, 
	quantity: Number,
	date: {type: Date, default: new Date()}
});

OrderSchema.path('name').required(true, "Customer name cannot be left blank.");

mongoose.model('Order', OrderSchema);
