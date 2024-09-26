hello blud,
so, I am gonna be real wit u

- bun.js
    - generate data, bruteForce, bruteForce2, hmap, hmap2, hmap3
    - bruteForce2 & hmap3 are the "final" solutions
    - use benchmark([method], nbRun), to execute "method" "nbRun" times
      it returns an array with duration of each run + the average
    - to run it: `bun run bun.js`
- visualization.js
    - used to show the possible values of [i, j]
    - pretty raw coded, only works with array of size 2 to 10
    - can change "isBruteForce2"
- analysis.js
    - the better benchmark
    - generates a csv file
    - run each methods multiple times, takes the average & do that for multiple
      length (you can change manually in benchmark2())
- zig.zig: the zig version of 2sum, but the bare minimum!
    - `zig run zig.zig -O ReleaseFast`
- rust/...
    - rust version of bun.js (simplified)
    - cargo run
