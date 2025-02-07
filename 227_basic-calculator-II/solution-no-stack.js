var calculate = function(s) {
  let sum = 0;
  let term = 0;
  let op = "+";

  for (let i = 0; i < s.length; i++) {

    if (s[i] === ' ') continue;

    if ('0' <= s[i] && s[i] <= '9') {

      const start = i;
      do {
        i++;
      }
      while (i < s.length && '0' <= s[i] && s[i] <= '9');

      const num = Number(s.slice(start, i));
      i--; // because the for loop will increment i

      switch (op) {
        case "+":
          sum += term;
          term = num;
          break;
        case "-":
          sum += term;
          term = -num;
          break;
        case "*":
          term *= num;
          break;
        case "/":
          term = Math.trunc(term / num);
          break;
      }

    }
    else { // operators
      op = s[i];
    }
  }

  return sum + term;

};

console.log(calculate(" 2/3 "))
