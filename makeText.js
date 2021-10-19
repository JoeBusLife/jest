/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov')
const process = require('process');
const argv = process.argv;

function cat(path){
	fs.readFile(path, 'utf8', (err, data) => {
		if (err){
			console.log(`Error reading ${path}: ${err}`);
			process.exit(21)
		}
		output(data);
	});
}

async function webCat(url){
	try {
		let res = await axios.get(url);
		output(res.data);
	} catch (err) {
		console.log(`Error fetching ${url}: ${err}`);
    process.exit(22);
	}
}

function output(data){
	const mm = new markov.MarkovMachine(data);
	console.log(mm.makeText());
}

if (argv[2].toLowerCase() === 'file') cat(argv[3]);
else if (argv[2].toLowerCase() === 'url') webCat(argv[3]);
else {
  console.error(`Unknown method: ${method}`);
  process.exit(20);
}