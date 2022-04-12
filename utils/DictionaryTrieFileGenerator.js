import * as fs from "fs";
import CSW19Words from "../dictionary/CSW19/CSW19Words.js";

const wordArray = CSW19Words;
const filePath = "/testexport.json";

main(wordArray, filePath);

function main(words, exportPath) {
  const trie = GenerateDictionaryTrie(words);

  console.log("Dictionary Trie Generated");
  console.log("Dictionary Trie Root Keys: " + Object.keys(trie).length);
  console.log("Dictionary Trie String Length: " + JSON.stringify(trie).length);
  console.log('trie["A"]["A"]["H"]');
  console.log(trie["A"]["A"]["H"]);

  if (!exportPath) {
    console.log("No export path specified");
    return;
  }
  if (!fs.existsSync(exportPath)) {
    console.log("Export path directory does not exist");
    return;
  }
  console.log("Exporting Dictionary Trie to: " + exportPath);
  const json = JSON.stringify(trie);
  fs.writeFileSync(exportPath, json);
}

function GenerateDictionaryTrie(wordList) {
  const dictionaryTrie = {};
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    var node = dictionaryTrie;
    for (let j = 0; j < word.length; j++) {
      if (!node[word[j]]) {
        node[word[j]] = {};
      }
      node = node[word[j]];
      if (j == word.length - 1) {
        node.end = true;
      }
    }
  }
  return dictionaryTrie;
}

function testGenerate() {
  const testWords = ["AA", "AAH", "AAHED", "AAHING", "AAHS", "AAL", "AALII", "AALIIS"];
  const dictionaryTrie = GenerateDictionaryTrie(testWords);
  console.log(dictionaryTrie["A"]["A"]["H"]);
}
