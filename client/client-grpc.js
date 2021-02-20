const grpc = require('grpc');
const PHOTO_PATH = '../src/notes.proto';
const NoteService = grpc.load(PHOTO_PATH).NoteService;

const client = new NoteService('localhost:50051', grpc.credentials.createInsecure());

module.exports = client;