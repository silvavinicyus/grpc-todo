const grpc = require('grpc');
const notesProto = grpc.load('./src/notes.proto');
const uuid =require('uuid');

const notes = [
    {id: '1', name: 'Todo 1', hours: "10:00"},
    {id: '2', name: 'Todo 2', hours: "20:00"},    
]

const server = new grpc.Server();

server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, notes)
    },
    get:(call, callback) => {
        let note = notes.find((n) => n.id == call.request.id);
        if (note) {
            callback(null, note);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        }
    },
    insert: (call, callback) =>{
        let note = call.request;
        note.id = uuid.v1();
        notes.push(note);
        callback(null, note)
    },    
    delete: (call, callback) => {
        let existingNoteIndex = notes.findIndex((n) => n.id == call.request.id);
        if(existingNoteIndex != -1){
            notes.splice(existingNoteIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            })
        }
    },
    update: (call, callback) => {
        let existingNote = notes.find((n) => n.id == call.request.id);
        if(existingNote){
            existingNote.name = call.request.name;
            existingNote.hours = call.request.hours;
            callback(null, existingNote);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found",
            })
        }
    }
})

server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:50051');
server.start();