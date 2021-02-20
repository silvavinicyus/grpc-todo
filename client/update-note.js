const client = require('./client-grpc');

const updateNote = {
    id: '1',
    name: 'Todo novo atualizado',
    hours: '11:00'
}

client.update(updateNote, (error, note) => {
    if(!error){
        console.log('Note has been updated succesfully', note);
    } else {
        console.error(error);
    }
})