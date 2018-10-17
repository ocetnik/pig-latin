const pigLatin = require('./index');

describe('translate word', () => {
  test('Words that start with a consonant have their first letter moved to the end of the'
    + ' word and the letters “ay” added to the end', () => {
    expect(pigLatin.translate('Hello')).toBe('Ellohay');
  });
  test('Words that start with a vowel have the letters “way” added to the end', () => {
    expect(pigLatin.translate('apple')).toBe('appleway');
  });
  test('Words that end in “way” are not modified', () => {
    expect(pigLatin.translate('stairway')).toBe('stairway');
  });
  test('Punctuation must remain in the same relative place from the end of the word', () => {
    expect(pigLatin.translate('can\'t')).toBe('antca\'y');
    expect(pigLatin.translate('end.')).toBe('endway.');
  });
  test('Hyphens are treated as two words', () => {
    expect(pigLatin.translate('this-thing')).toBe('histay-hingtay');
    expect(pigLatin.translate('can\'t-do-approach')).toBe('antca\'y-oday-approachway');
  });
  test('Capitalization must remain in the same place', () => {
    expect(pigLatin.translate('Beach')).toBe('Eachbay');
    expect(pigLatin.translate('McCloud')).toBe('CcLoudmay');
  });
  test('Throw error when input is empty string', () => {
    expect(() => pigLatin.translate('')).toThrow();
  });
});

describe('translate sentence', () => {
  test('should translate sentence', () => {
    expect(pigLatin.translate('We\'re looking for a dog-friendly hotel.'))
      .toBe('Erew\'ay ookinglay orfay away ogday-riendlyfay otelhay.');
  });
});

describe('translate paragraph', () => {
  test('should translate paragraphs', () => {
    expect(pigLatin.translate('We\'re looking for a dog-friendly hotel. Is this hotel dog friendly?'))
      .toBe('Erew\'ay ookinglay orfay away ogday-riendlyfay otelhay. Siay histay otelhay ogday riendlyfay?');
  });
});

describe('helpers', () => {
  describe('getPunctuation', () => {
    test('should return null when the word doesn\'t contain punctuation', () => {
      expect(pigLatin.getPunctuation('can')).toBe(null);
    });
    test('should throw error when the word contains more than one punctuation', () => {
      expect(() => pigLatin.getPunctuation('Q.E.D.')).toThrow();
    });
    test('should get punctuation when the word contains only one punctuation', () => {
      expect(pigLatin.getPunctuation('can\'t')).toBe('\'');
    });
  });
  describe('getPunctuationIndexFromTheEndOfWord', () => {
    test('should get correct index when punctuation is in the beginning of the word', () => {
      expect(pigLatin.getPunctuationIndexFromTheEndOfWord('\'em', '\'')).toBe(2);
    });
    test('should get correct index when punctuation is in the end of the word', () => {
      expect(pigLatin.getPunctuationIndexFromTheEndOfWord('runnin\'', '\'')).toBe(0);
    });
    test('should get correct index when punctuation is in the middle of the word', () => {
      expect(pigLatin.getPunctuationIndexFromTheEndOfWord('can\'t', '\'')).toBe(1);
    });
    test('should get -1 when the word doesn\'t contain punctuation', () => {
      expect(pigLatin.getPunctuationIndexFromTheEndOfWord('can', '\'')).toBe(-1);
    });
    test('should get -1 when punctuation is null', () => {
      expect(pigLatin.getPunctuationIndexFromTheEndOfWord('can', null)).toBe(-1);
    });
  });
  describe('getWordWithoutPunctuation', () => {
    test('should get original word when punctuationIndex === -1', () => {
      expect(pigLatin.getWordWithoutPunctuation('can', -1)).toBe('can');
    });
    test('should get correct word when punctuation is in the beginning of the word', () => {
      expect(pigLatin.getWordWithoutPunctuation('\'em', 2)).toBe('em');
    });
    test('should get correct word when punctuation is in the end of the word', () => {
      expect(pigLatin.getWordWithoutPunctuation('runnin\'', 0)).toBe('runnin');
    });
    test('should get correct word when punctuation is in the middle of the word', () => {
      expect(pigLatin.getWordWithoutPunctuation('can\'t', 1)).toBe('cant');
    });
  });
  describe('addPunctuationIntoWord', () => {
    test('should add punctuation on the correct index', () => {
      expect(pigLatin.addPunctuationIntoWord('cant', '\'', 1)).toBe('can\'t');
    });
    test('should return unmodified word when there is no punctuation', () => {
      expect(pigLatin.addPunctuationIntoWord('can', null, 1)).toBe('can');
      expect(pigLatin.addPunctuationIntoWord('can', '\'', -1)).toBe('can');
    });
  });
  describe('handleFirstLetter', () => {
    test('should add correct suffix when word starts with a consonant', () => {
      expect(pigLatin.handleFirstLetter('apple')).toBe('appleway');
    });
    test('should add correct suffix when word starts with a vowel', () => {
      expect(pigLatin.handleFirstLetter('hello')).toBe('ellohay');
    });
  });
  describe('handleCapitalization', () => {
    test('should handle capitalization', () => {
      expect(pigLatin.handleCapitalization('AbCdEf', 'bCdEfaay')).toBe('BcDeFaay');
    });
  });
  describe('splitStringIntoWordsAndDelimiters', () => {
    test('should split word', () => {
      expect(pigLatin.splitStringIntoWordsAndDelimiters('end')).toEqual({
        words: ['end'],
        delimiters: [],
      });
    });
    test('should split word with dot in the end', () => {
      expect(pigLatin.splitStringIntoWordsAndDelimiters('end.')).toEqual({
        words: ['end', ''],
        delimiters: ['.'],
      });
    });
    test('should split word with hyphen', () => {
      expect(pigLatin.splitStringIntoWordsAndDelimiters('this-thing')).toEqual({
        words: ['this', 'thing'],
        delimiters: ['-'],
      });
    });
    test('should split sentence', () => {
      expect(pigLatin.splitStringIntoWordsAndDelimiters(
        'We\'re looking for a dog-friendly hotel.',
      )).toEqual({
        words: ['We\'re', 'looking', 'for', 'a', 'dog', 'friendly', 'hotel', ''],
        delimiters: [' ', ' ', ' ', ' ', '-', ' ', '.'],
      });
    });
    test('should split paragraph', () => {
      expect(pigLatin.splitStringIntoWordsAndDelimiters(
        'We\'re looking for a dog-friendly hotel. Is this hotel dog friendly?',
      )).toEqual({
        words: ['We\'re', 'looking', 'for', 'a', 'dog', 'friendly', 'hotel', 'Is', 'this', 'hotel', 'dog', 'friendly', ''],
        delimiters: [' ', ' ', ' ', ' ', '-', ' ', '. ', ' ', ' ', ' ', ' ', '?'],
      });
    });
  });
});
