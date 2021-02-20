const client = require('./client-grpc');

let newNote = {
    name: "Todo 3",
    hours: "23:00"
}

client.insert(newNote, (error, note) => {
    if(!error) {
        console.log('New Todo created sucessfully', note);
    } else {
        console.log(error);
    }
});