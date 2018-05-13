module.exports = generateEmployeeKey = () => {
  let newArr = []
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 20; i++) {
    if (i < 5) {
      newArr.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    else {
      newArr.push(Math.floor(Math.random() * 10))
    }
  }

  return newArr.join('');
}

