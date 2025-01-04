// Using a Loop
var sum_to_n_a = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Using the Arithmetic Formula
function sum_to_n(n) {
  return (n * (n + 1)) / 2;
}

// Using Recursion
function sum_to_n(n) {
  if (n === 0) return 0;
  return n + sum_to_n(n - 1);
}
