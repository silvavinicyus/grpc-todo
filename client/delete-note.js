const client = require('./client-grpc');

client.delete({id: '1'}, (error, _) => {
    if(!error){
        console.log('Note has been sucessfully deleted');        
    } else {
        console.error(error);
    }
})