# MapReduce
## a simple client/server command line utility

`mapreduce` is a command line utility works on client/server protocol. It accepts an input from client in file content and sends it to server to get the result.

## Tech

`mapreduce` on vanila JavaScript and runs on plain NodeJS server.

## Installation

`mapreduce` requires [Node.js](https://nodejs.org/) v12+ to run.

Install the plugin.

```sh
cd mapreduce
npm i -g
```

#### Usage

For server side

```sh
mapreduce --server {max_allowed_child_process}
```

For client side:

```sh
mapreduce --client {file_path}
```
#### Arguments

| Name | Description | Value |
| ------ | ------ |---- |
| --server | Indicates the utility going to run on server mode. Basically to process the file from client |
| --client | Indicates the utility going to run on client mode. To accepts a file from client machine |
| --max_allowed_child_process | Number of child process to be allowed to fork | 3 |
| --file_path | The path of the file to be read | `~/Documents/readme.txt` |

#### _Note_
* Please make sure to run server utility first, as client requires server up and running to process the file.
* Content of the file should contain lines having list numbers. 
* Example:
1 2 3 4 5 5
5 8 9 7 3 8 7
9 4 74 88 66

