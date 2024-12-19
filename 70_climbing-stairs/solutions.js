// SLOW RECURSION -------------------------------------------------------------
var climbStairs = function(n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
};

// TOP-DOWN, memoization with a map -------------------------------------------
var climbStairs = function(n) {
  const memo = new Map();
  return helper(n, memo);
};

function helper(n, memo) {
  if (n <= 2) return n;
  if (!memo.has(n)) {
    memo.set(n, helper(n - 1, memo) + helper(n - 2, memo));
  }
  return memo.get(n);
}

// TOP-DOWN, memoization with an array ----------------------------------------
var climbStairs = function(n) {
  const memo = [];
  return helper(n, memo);
};

function helper(n, memo) {
  if (n <= 2) return n;
  if (!memo[n]) {
    memo[n] = helper(n - 1, memo) + helper(n - 2, memo);
  }
  return memo[n];
}

// BOTTOM-UP ------------------------------------------------------------------
var climbStairs = function(n) {
  const tab = Array.from({ length: n + 1 });
  tab[1] = 1;
  tab[2] = 2;
  for (let i = 3; i <= n; i++) {
    tab[i] = tab[i - 1] + tab[i - 2];
  }
  return tab[n];
};


// BOTTOM-UP FINAL TRICKS -----------------------------------------------------
var climbStairs = function(n) {
  if (n <= 2) return n;
  let nMinusTwo = 1;
  let nMinusOne = 2;
  let res = nMinusTwo + nMinusOne;
  for (let i = 3; i <= n; i++) {
    res = nMinusTwo + nMinusOne;
    nMinusTwo = nMinusOne;
    nMinusOne = res;
  }
  return res;
};
