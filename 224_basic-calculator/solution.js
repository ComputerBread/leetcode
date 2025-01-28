/**
 * @param {string} s
 * @return {number}
 */
/*
E -> U (+|- U)
U -> -U | F
F -> D+ | (E)
D -> 0 | 1 | 2 | 3 | 4 | ... | 9
*/
var calculate = function(s) {
  const tokens = {
    tokens: scan(s),
    curr: 0,
    next() {
      if (this.curr == this.tokens.length) {
        return "END";
      }
      return this.tokens[this.curr++];
    },
    peek() {
      if (this.curr >= this.tokens.length - 1) {
        return "END";
      }
      return this.tokens[this.curr];
    }
  };
  return E(tokens);
};

function scan(s) {
  const tokens = [];
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case '+':
        tokens.push({ type: "PLUS" });
        break;
      case '-':
        tokens.push({ type: "MINUS" });
        break;
      case '(':
        tokens.push({ type: "LPAREN" });
        break;
      case ')':
        tokens.push({ type: "RPAREN" });
        break;
      default:
        if ('0' <= s[i] && s[i] <= '9') {
          const start = i;
          while (i < s.length && '0' <= s[i] && s[i] <= '9') i++;
          tokens.push({ type: "NUMBER", value: Number(s.slice(start, i)) });
          i--;
        }
        // discard whitespaces!
        break;
    }
  }
  return tokens;
}
function E(t) {
  let res = U(t);
  while (t.peek().type === "PLUS" || t.peek().type === "MINUS") {
    const op = t.next();
    if (op.type === "PLUS")
      res += U(t);
    else
      res -= U(t);
  }
  return res;
}

function U(t) {
  if (t.peek().type === "MINUS") {
    t.next(); // discard "-"
    return -U(t);
  }
  return F(t);
}

function F(t) {
  if (t.peek().type === "LPAREN") {
    t.next();
    let res = E(t);
    t.next(); // consume rparen;
    return res;
  }
  const n = t.next();
  return n.value; // return digit
}


function test(input, expected) {

  console.log(`input: ${input}, expected: ${expected}, actual: ${calculate(input)}`);
}

test("(1+(4+5+2)-3)+(6+8)", 23)
test("1 + 1", 2)
test("2-1 + 2", 3)
test("-(2+ 3)", -5)
