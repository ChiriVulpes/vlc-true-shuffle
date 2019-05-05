////////////////////////////////////
// App
//

const path = require("path");
const [, , xspfFilename] = process.argv;

// shuffle playlist
const fs = require("fs");
const xml = fs.readFileSync(xspfFilename, "utf8");

const tracks = shuffle(matches(/<track>(.|\n|\r)*?<\/track>/g, xml))
	.map(([track], index) => track.replace(/\d+(?=<\/vlc:id>)/, index));

const result = xml.replace(/<track>(.|\n|\r)*<\/track>/g, tracks.join("\n\t\t"));

const shuffledXspfFilename = path.join(__dirname, "shuffled.xspf");
fs.writeFileSync(shuffledXspfFilename, result);


// open vlc
const exec = require("child_process").exec;
exec(`start "" "${shuffledXspfFilename}"`);


////////////////////////////////////
// Util
//

/**
 * Generator for the matches of a regular expression on a string.
 * @param {RegExp} regex The regular expression to execute on the string.
 * @param {string} str The string to execute the regular expression on.
 */
function* matches(regex, str) {
	while (true) {
		const arr = regex.exec(str);
		if (arr) {
			yield arr;

		} else {
			break;
		}
	}
}

/**
 * Creates a shuffled array from an iterable.
 * @param {Iterable<any>} iterable An iterable containing the items to shuffle.
 */
function shuffle(iterable) {
	const arr = Array.from(iterable);
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
