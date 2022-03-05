function Person(name) {
  var _name = name;
  this.name = name;
  this.getName = function () {
    return _name;
    // console.log(_name);
  };
}

var p = new Person("bibibi");
console.log(p.name); //bibibi
console.log(p._name); //undefined
console.log(p.getName()); //bibibi
