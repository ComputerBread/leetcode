const N = 10;
const isBruteForce2 = false;

function draw(I, J) {

  console.clear();
  console.log("")

  let li1 = "        ";
  let li2 = "        ";
  for (let i = 0; i < N; i++) {
    if (i == I) {
      li1 += `   i    `;
      li2 += `   ↓    `;
    } else {
      li1 += `        `;
      li2 += `        `;
    }
  }
  console.log(li1);
  console.log(li2);
  console.log("nums = [   0   ,   1   ,   2   ,   3   ,   4   ,   5   ,   6   ,   7   ,   8   ,   9   ]");

  let l0 = "        ";
  let l1 = "        ";
  let l2 = "        ";
  for (let j = 0; j < N; j++) {
    if (j == J) {
      l0 += `   ↑    `;
      l1 += `   j    `;
      l2 += `   ↓    `;
    } else {
      l0 += `        `;
      l1 += `        `;
      l2 += `        `;
    }
  }
  console.log(l0)
  console.log(l1)
  console.log(l2)

  let l3 = "       |";
  for (let i = 0; i < N; i++) {
    l3 += `   ${i}   |`
  }
  console.log(l3);
  for (let i = 0; i < N; i++) {
    let row = "";
    if (I == i) row = `i -> ${i} |`;
    else row = `     ${i} |`;
    for (let j = 0; j < N; j++) {
      if (i > I || (i === I && j > J)) row += "       |";
      else if (isBruteForce2 && i >= j) row += `   x   |`;
      else if (i === j) row += `   x   |`;
      else row += ` [${i},${j}] |`;
    }
    console.log(row)
  }

}

let i = 0, j = 0;
function drawAnimated() {
  draw(i, j);
  j++;
  if (j == N) {
    j = 0;
    i++;
  }
  if (i !== N) {
    if (isBruteForce2 && i >= j || !isBruteForce2 && i === j) drawAnimated();
    else setTimeout(drawAnimated, 100);
  }
}
drawAnimated();
