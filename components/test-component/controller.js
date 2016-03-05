const model = require('./model.js');

const PI = Math.PI;

var calculate = function (r) {
    return PI * r * r;
};

exports.area = (r) => calculate(r);


var speakNSpell = function (foo) {
    return model.speak(9);
}

exports.speak = (foo) => speakNSpell(foo);