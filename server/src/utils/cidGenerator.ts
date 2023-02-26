export default function getCid() {
  return String.fromCharCode(...new Array(length).fill('').map(() => (
    arr.charCodeAt(Math.floor(Math.random() * arr.length))  // hide?
  )));
}

const length = 32;
const nums = new Array(10).fill(48).map((v, i) => v + i);
const lowers = new Array(26).fill(65).map((v, i) => v + i);
const uppers = new Array(26).fill(97).map((v, i) => v + i);
const arr = String.fromCharCode(...nums, ...lowers, ...uppers);
