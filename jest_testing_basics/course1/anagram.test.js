const isAnagram = require('./anagram');


test('isAnagram function exists', () => {
  expect(typeof isAnagram).toEqual('function');
});

test('"Cinema" is an anagram of "Iceman"',() => {
  let str1 = 'Cinema';
  let str2 = 'Iceman';
  let result = isAnagram(str1,str2);

  expect(result).toBeTruthy();
})

test(`"Hello" is NOT an anagram of "Aloha"`,() => {
  var str1 = 'Hello';
  var str2 = 'Aloha';
  let result = isAnagram(str1,str2);

  expect(result).toBeFalsy();
})