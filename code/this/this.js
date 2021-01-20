let o = {
  a: 1,
  b: this
}

console.log(o.b);
console.log(o.b == o);
console.log(o.b == globalThis);
console.log(o.b == undefined);