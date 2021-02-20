const client = require('./client-grpc');

client.get({id: '1'}, (error, note) => {
    if(!error) {
        console.log('Note: ', note);
    } else {
        console.error(error);
    }
})