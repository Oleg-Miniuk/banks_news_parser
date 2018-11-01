const aaa = {
  a: 11
};

Object.assign(global, { aaa });
const timer = setInterval(() => console.log('dick'), 2000);

setTimeout(() => {
  clearInterval(timer);
}, 30000);
