/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
		const chain = {};
		const w = this.words;
		for (let i=0; i<w.length; i++){
			let nextW = w[i+1] ? w[i+1] : null;
			if (w[i] in chain){
				chain[w[i]].push(nextW)
			} else {
				chain[w[i]] = [nextW]
			}
		}
		this.wordChain = chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
		let curWord = this.randomStartWord();
		let sentence = curWord;
		for (let i=1; i < numWords; i++){
			let possNext = this.wordChain[curWord];
			curWord = possNext[possNext.length * Math.random() << 0];

			if (curWord !== null) sentence += " " + curWord;
			else break;
		}
		return sentence;
  }

	randomStartWord() {
    let keys = Object.keys(this.wordChain);
    return keys[ keys.length * Math.random() << 0];
	};
}

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.wordChain);
// console.log(mm.makeText());
// console.log(mm.makeText(numWords = 10));

module.exports = {MarkovMachine: MarkovMachine}