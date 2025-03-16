function generateTrigrams(word) {
    let trigrams = [];

    for (let i = 0; i < word.length - 2; i++) {
        trigrams.push(word.substring(i, i + 3));
    }
    return trigrams;
}

let word = "onoorbaar";
let trigrams = generateTrigrams(word);

console.log(trigrams.join('\n'));
console.log(trigrams.length);