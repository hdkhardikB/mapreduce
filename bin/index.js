#!/usr/bin/env node

const client = require("./client/client");
const server = require('./server/server');

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error(`Passed wrong number of arguments. Try running 'mapreduce --client {file_path}' or 'mapreduce --server {max_child_process_count} `)
}
switch (args[0]) {
    case "--client":
        client(args[1])
        break;
    case "--server":
        server(args[1])
        break;
    default:
        console.log("Hey, seems you haven't passed atleast one argument (client or server). Please read the document!");
        break;
}