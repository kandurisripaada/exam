// OS Module
const os = require('os');

console.log('Platform:', os.platform());
console.log('OS Type:', os.type());
console.log('CPU Architecture:', os.arch());
console.log('CPU Info:', os.cpus());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
console.log('Hostname:', os.hostname());
console.log('Uptime (seconds):', os.uptime());
// Path Module
const path = require('path');

const filePath = '/users/admin/docs/file.txt';

console.log(path.basename(filePath)); // Output: file.txt
console.log(path.dirname(filePath));  // Output: /users/admin/docs
console.log(path.extname(filePath));  // Output: .txt
console.log(path.join('folder1', 'folder2', 'file.txt')); // Output: folder1/folder2/file.txt


// Util Module
const util = require('util');

const name = 'Alice';
const age = 25;
console.log(util.format('Name: %s, Age: %d', name, age));
// Output: Name: Alice, Age: 25
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function read() {
  try {
    const data = await readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
read();

const util = require('util');

const obj = {
  name: 'Node.js',
  features: ['events', 'streams', 'http'],
  nested: { level: 1, deeper: { level: 2 } }
};

console.log(util.inspect(obj, { depth: null }));

// Events Module
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit the event
emitter.emit('greet', 'Alice');

________________________________________
✅ c. Use fs module to Create Directories and Files
javascript
CopyEdit
// filesystem.js
const fs = require('fs');
const path = require('path');

const dir = './myFolder';

// Create directory
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
  console.log("Directory created.");
}

// Create text file
fs.writeFileSync(path.join(dir, 'hello.txt'), 'Hello, world!');
console.log("Text file created.");

// Create JSON file
const data = { name: "Alice", age: 30 };
fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(data, null, 2));
console.log("JSON file created.");
________________________________________
✅ d. Read and Write Streaming Data
const fs = require('fs');

// Create readable stream from input.txt
const readStream = fs.createReadStream('input.txt', 'utf8');

// Create writable stream to output.txt
const writeStream = fs.createWriteStream('output.txt');

// Pipe the read stream directly into the write stream
readStream.pipe(writeStream);

// Optional: handle events
readStream.on('data', (chunk) => {
  console.log('Reading chunk:', chunk.length);
});

readStream.on('end', () => {
  console.log('Finished reading');
});

writeStream.on('finish', () => {
  console.log('Finished writing');
