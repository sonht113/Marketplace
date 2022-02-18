const mongoose = require('mongoose');

async function connect() {
    try {
		await mongoose.connect('mongodb+srv://hotrongson:hotrongson18101999@cluster0.m4rsg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        console.log('Connect successfully!');
    } catch(error) {
        console.log('Connect fail!');
    }
}
module.exports = { connect };
