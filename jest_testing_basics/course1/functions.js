const { default: axios } = require("axios");

const functions =  {
  add: (num1,num2) => num1 + num2,
  sub: (num1,num2) => num1 - num2,
  isNull: () => null,
  checkValue: (x) => x,
  createUser: () => {
    const user = {
      firstName: 'Marcos'
    }
    user['lastName'] = 'Aurélio';
    return user;
  },
  fetchUser: () => axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then((res) => res.data)
    .catch((e) => console.log(e.message))
};

module.exports = functions;