function isValidRec(s) {
  function helper(s, index, open) {
    // If we've reached the end of the string
    if (index === s.length) {
      return open.length === 0; // Valid if no open brackets left
    }

    const current = s[index];
    // If it's an opening bracket, recurse with this bracket added to 'open'
    if (current === '(' || current === '{' || current === '[') {
      return helper(s, index + 1, open + current);
    }
    // If it's a closing bracket, check if it matches the last opening
    else if (current === ')' || current === '}' || current === ']') {
      if (open.length === 0 || !match(open[open.length - 1], current)) {
        return false; // Mismatch or too many closing brackets
      }
      return helper(s, index + 1, open.slice(0, -1)); // Remove last opening
    }

    return helper(s, index + 1, open); // Skip any invalid characters
  }

  function match(open, close) {
    return (open === '(' && close === ')') ||
      (open === '{' && close === '}') ||
      (open === '[' && close === ']');
  }

  return helper(s, 0, ""); // Start with an empty string of open brackets
}


f(s, prev, int * index);

if (index > s.length) return prev == -1;
while (isOpening(s[index])) {
  if (!f(s, index, index + 1)) return false;
}
// if closing
if (boundchecking()) return false || true;
if (matching(s[prev], s[index])) return true;
//return false;


var isValid = function(s) {
  let i = 0;
  const stack = [];
  while (i < s.length) {
    if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
      stack.push(s[i]);
    } else if (stack.length === 0 || !match(stack.pop(), s[i])) {
      return false;
    }
    i++;
  }
  return stack.length === 0;

}

isValid(s) {
  let i = 0;
  const stack = [];
  while (i < s.length) {
    if (s[i] == '(' || s[i] == '{' || s[i] == '[') {
      if (!f(s, i + 1)) return false;
      // stack.push(s[i]);
    } else {
      return false;
    }
    i++;
  }
  return stack.length === 0;
}
function f(s, i) {
  let curr = s[i];
  if (curr == '(' || curr == '{' || curr == '[') {
    f(s, i + 1);
  }
  if (s[i] == ')' || s[i] == '}' || s[i] == ']') {
    return matching(curr, s[i])
  }
}




__________

function isValid(s) {
  return f(s, 0) === true;
}
function f(s, i) {
  let curr = s[i];
  if (curr == '(' || curr == '{' || curr == '[') {
    let closing = f(s, i + 1);
    return matching(curr, closing)
  } else {
    return curr;
  }

}

------------------

