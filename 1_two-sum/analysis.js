// run with bun run bun.js
import assert from "assert";

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateData(LENGTH = 1e4) {
  const MIN_VAL = -1e9;
  const MAX_VAL = 1e9;
  const TARGET = getRandomNum(MIN_VAL, MAX_VAL)

  // Initialize the array with random i32 values
  let nums = new Array(LENGTH);

  // Randomly pick indices i and j, ensuring they are different
  let i = getRandomNum(0, LENGTH);
  let j = getRandomNum(0, LENGTH);
  while (i == j) {
    j = getRandomNum(0, LENGTH);
  }

  // Adjust nums[i] and nums[j] so that nums[i] + nums[j] = target
  // to stay inside the constraints
  do {
    nums[i] = getRandomNum(MIN_VAL, MAX_VAL);
    nums[j] = TARGET - nums[i];
  } while (nums[j] > 1e9 || nums[j] < -1e9)

  // filling the array while makign sure there's a unique solution
  const map = new Map();
  nums = Array.from(nums, (v, k) => {
    if (k === i || k === j) return v;
    let value;
    while (true) {
      value = getRandomNum(MIN_VAL, MAX_VAL)
      if (value === nums[i] || value === nums[j]) continue;
      if (map.has(TARGET - value)) continue;
      map.set(value, true);
      return value;
    }
  });

  return { nums, target: TARGET, i, j }; // Return the array, target, and the indices that sum to the target
}

// Example usage
const { nums, target, i, j } = generateData();
console.log(`Target: ${target}, nums[${i}] + nums[${j}] = ${nums[i]} + ${nums[j]} = ${nums[i] + nums[j]}`);


function bruteForce(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      if (nums[i] + nums[j] === target) {
        return { i, j };
      }
    }
  }
}

function bruteForce2(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return { i, j };
      }
    }
  }
}

function hmap(nums, target) {
  const map = new Map();
  nums.forEach((n, i) => {
    map.set(n, i);
  });
  for (let i = 0; i < nums.length; i++) {
    const j = map.get(target - nums[i]);
    if (j !== undefined && i !== j) {
      return { i, j: map.get(target - nums[i]) };
    }
  }
}

function hmap2(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const j = map.get(target - nums[i]);
    if (j !== undefined) {
      return { i, j };
    }
    map.set(nums[i], i);
  }
}

function hmap3(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const sub = target - nums[i];
    if (map.has(sub)) {
      return { i, j: map.get(sub) };
    }
    map.set(nums[i], i);
  }
}

function isResCorrect(data, res) {
  return (data.i === res.i && data.j === res.j)
    || (data.j === res.i && data.i === res.j);
}


function benchmark(methods, runNb) {
  const benchRes = new Array(methods.length);
  for (const fn of methods) {
    let avg = 0;
    let measures = [fn.name];
    for (let i = 0; i < runNb; i++) {

      console.log(`${fn.name}#${i}`);
      const data = generateData();

      const t0 = performance.now();
      const res = fn(data.nums, data.target);
      const t1 = performance.now();

      assert(isResCorrect(data, res));
      const t = t1 - t0;
      avg += t;
      measures.push(t);
    }
    measures.push(`avg: ${avg / runNb} ms`);
    benchRes.push(measures);
  }
  return benchRes;
}

function userFeedback(start, length) {
  const now = performance.now();
  const elapsedTime = now - start;
  // Convert to minutes, seconds, and milliseconds
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor(elapsedTime % 1000);
  const sec = seconds.toString().padStart(2, '0');
  const ms = milliseconds.toString().padStart(3, '0');
  console.log(`length: ${length}, total duration: ${minutes} min ${sec} sec ${ms} ms`);
}
function benchmark2(methods, runNb) {
  const startingTime = performance.now();
  const file = Bun.file(`./benchdata-${Date.now()}.csv`);
  const writer = file.writer();
  writer.write(["length", ...(methods.map(m => m.name))].join())
  writer.write("\n");
  for (let l = 10; l <= 1e5; l += 100) { // change max & increment as needed
    const measure = Array.from({ length: methods.length }, _ => 0);
    userFeedback(startingTime, l);
    for (let r = 0; r < runNb; r++) {
      const data = generateData(l);
      for (let m = 0; m < methods.length; m++) {
        const t0 = performance.now();
        const res = methods[m](data.nums, data.target);
        const t1 = performance.now();

        assert(isResCorrect(data, res));
        const t = t1 - t0;
        measure[m] += t;
      }
    }
    // get average
    measure.map((_, idx) => measure[idx] /= runNb);
    writer.write([l, ...measure].join());
    writer.write("\n");
    writer.flush();
  }
}


//const res = benchmark([bruteForce], 10);
// const res = benchmark([bruteForce, bruteForce2], 10);
// benchmark([bruteForce, bruteForce2, hmap], 10);
//benchmark2([hmap, hmap2, hmap3], 10);
benchmark2([bruteForce2, hmap3], 5);


