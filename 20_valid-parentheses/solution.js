function match(open, close) {
  return (open === '(' && close === ')')
    || (open === '{' && close === '}')
    || (open === '[' && close === ']');
}
var isValid = function(s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
      stack.push(s[i]);
    } else if (stack.length === 0 || !match(stack.pop(), s[i])) {
      return false;
    }
  }
  return stack.length === 0;
}
