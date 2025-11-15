const sum_to_n_loop = (n) => {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

const sum_to_n_formula = (n) => {
  return (n * (n + 1)) / 2;
};

const sum_to_n_recursion = (n) => {
  if (n <= 1) return n;
  return n + sum_to_n_recursion(n - 1);
};

const n = 6;
console.log(`Sum to ${n} (sum_to_n_loop): ${sum_to_n_loop(n)}`);
console.log(`Sum to ${n} (sum_to_n_formula): ${sum_to_n_formula(n)}`);
console.log(`Sum to ${n} (sum_to_n_recursion): ${sum_to_n_recursion(n)}`);