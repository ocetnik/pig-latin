# Pig Latin

Write some JavaScript code that translates a string (word, sentence, or paragraph) into “pig-latin” using the following rules.
 * Words that start with a consonant have their first letter moved to the end of the word and the letters “ay” added to the end.
   * Hello becomes **Ellohay**
 * Words that start with a vowel have the letters “way” added to the end.
   * apple becomes **appleway**
 * Words that end in “way” are not modified.
   * stairway stays as **stairway**
 * Punctuation must remain in the same relative place from the end of the word.
   * can’t becomes **antca’y**
   * end. becomes **endway.**
 * Hyphens are treated as two words.
   * this-thing becomes **histay-hingtay**
 * Capitalization must remain in the same place.
   * Beach becomes **Eachbay**
   * McCloud becomes **CcLoudmay**
   
---

#### Installation
```
git clone git@github.com:ocetnik/pig-latin.git
cd pig-latin
yarn install --pure-lockfile
```

#### Usage
```js
const pigLatin = require('./index');
console.log(pigLatin.translate('Your word, sentence, or paragraph.'));
```

#### Running the tests
```
yarn test
```

#### Running the linter
```
yarn eslint
```
