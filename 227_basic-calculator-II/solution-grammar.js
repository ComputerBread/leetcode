var calculate = function(s) {
  const scanner = new Scanner(s);
  return parse(scanner);
};


function Scanner(s) {
  this.s = s;
  this.curr = 0;

  this.scanToken = function() {

    // skip whitespace
    while (this.curr < this.s.length && this.s[this.curr] === ' ') {
      this.curr++;
    }

    if (this.curr === this.s.length) return "EOL";


    if ('0' <= this.s[this.curr] && this.s[this.curr] <= '9') {

      const start = this.curr;
      do {
        this.curr++;
      }
      while (this.curr < this.s.length && '0' <= this.s[this.curr] && this.s[this.curr] <= '9');

      return Number(s.slice(start, this.curr));

    } else { // operator
      return this.s[this.curr++];
    }

  };

  this.peek = function() {
    // skip whitespace
    while (this.curr < this.s.length && this.s[this.curr] === ' ') {
      this.curr++;
    }

    if (this.curr === this.s.length) return "EOL";

    return this.s[this.curr];

  }
}

function parse(scanner) {

  function Expression() {
    let res = Term();
    while (scanner.peek() === "+" || scanner.peek() === "-") {
      const op = scanner.scanToken();
      const term = Term();
      res = (op == "+") ? res + term : res - term;
    }
    return res;
  }

  function Term() {
    let res = Num();
    while (scanner.peek() === "*" || scanner.peek() === "/") {
      const op = scanner.scanToken();
      const factor = Num();
      res = (op == "*") ? res * factor : Math.trunc(res / factor);
    }
    return res;
  }

  function Num() {
    return scanner.scanToken();
  }

  return Expression();
}

console.log(" 2/3 ", calculate(" 2/3 "))
console.log("2/3", calculate("2/3"))
console.log("2 / 3", calculate("2 / 3"))
console.log("2 *3/ 3", calculate("2 *3/ 3"))
console.log("2 *3+1-6/ 3", calculate("2 *3+1-6/ 3"))
