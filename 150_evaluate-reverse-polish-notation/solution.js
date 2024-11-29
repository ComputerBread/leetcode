/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    switch (tokens[i]) {
      case '+':
        stack.push(stack.pop() + stack.pop());
        break;

      case '*':
        stack.push(stack.pop() * stack.pop());
        break;

      case '-':
        const right = stack.pop();
        const left = stack.pop();
        stack.push(left - right);
        break;

      case '/':
        const r = stack.pop();
        const l = stack.pop();
        stack.push(Math.trunc(l / r)); // Math.trunc is much faster than parseInt
        break;

      default: // numbers
        stack.push(Number(tokens[i]));
        break;
    }
  }
  return stack[0];
};
