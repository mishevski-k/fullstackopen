const mongoose = require('mongoose');

if(process.argv.length.length < 3){
    console.log('give password as argument');
    process.exit();
}

const password = process.argv[2];

const url = `mongodb+srv://mishevski2000:${password}@cluster0.plmkeby.mongodb.net/noteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
    content: String,
    impotant: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'HTML is Easy',
    imporatant: true,
});

// note.save().then(result => {
//     console.log(`note saved!`);
//     mongoose.connection.close();
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});