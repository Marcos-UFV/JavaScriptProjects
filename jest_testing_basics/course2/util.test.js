const {generateText} = require('./util.js');

test('should output be "Marcos (28 years old)"',() =>{
  const text = generateText('Marcos',28);
  expect(text).toBe('Marcos (28 years old)');
  const text2 = generateText('Juliana',28);
  expect(text2).toBe('Juliana (28 years old)');
});

test('should output data-less text',() => {
  const text = generateText('',null);
  expect(text).toBe(' (null years old)');
});

