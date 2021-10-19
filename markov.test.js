const { MarkovMachine } = require("./markov");

describe('Test MakovMachine class', () => {
	test('Create new instance of MakovMachine', () => {
		let mm = new MarkovMachine("the dog ate the door")
		expect(mm instanceof MarkovMachine).toBe(true);
		expect(mm.words).toEqual(['the', 'dog', 'ate', 'the', 'door'])
		expect(mm.wordChain).toEqual({
			the: [ 'dog', 'door' ],
			dog: [ 'ate' ],
			ate: [ 'the' ],
			door: [ null ]
		});
	});

	test('generates semi-predictable text', function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(["a b c", "b c", "c"]).toContain(text);
  });

	test('length of output not greater than', function () {
    let mm = new MarkovMachine("the dog ate the door")
    let sentence = mm.makeText(3);
		let sentenceWords = sentence.split(" ");
    expect(sentenceWords.length).toBeLessThanOrEqual(3);
  });
});