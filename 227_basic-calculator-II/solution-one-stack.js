var calculate = function(s) {
  const stack = [];
  stack.push(0); // optional
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
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack.push(stack.pop() * num);
          break;
        case "/":
          stack.push(Math.trunc(stack.pop() / num));
          break;
      }

    }
    else { // operators
      op = s[i];
    }
  }

  return stack.reduce((acc, curr) => acc + curr);

};

