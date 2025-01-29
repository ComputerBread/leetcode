var calculate = function(s) {
  const stack = [];
  let op = '+';
  let num = "";

  for (let i = 0; i <= s.length; i++) {

    if (s[i] === ' ') continue;

    if ('0' <= s[i] && s[i] <= '9') {
      num += s[i];
    }
    else { // operators
      num = Number(num);
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
      op = s[i];
      num = "";
    }
  }

  return stack.reduce((acc, curr) => acc + curr);

};

console.log("res: ", calculate(" 3/2 "));
