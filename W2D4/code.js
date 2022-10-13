/*
 Q1
 */
String.prototype.filter = function (word) {
  return this.split(" ").filter(w => w !== word).join(' ');
}
/*
 Q2
 */
Array.prototype.bubbleSort = function (desc = false) {
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this.length; j++) {
      if ((desc ? this[i] > this[j] : this[i] < this[j])) {
        let temp = this[i];
        this[i] = this[j];
        this[j] = temp;
      }
    }
  }
  return this;
}
/*
 Q3
 */
var Person = function () {
};
Person.prototype.initialize = function (name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.describe = function () {
  return this.name + ", " + this.age + " years old.";
}
var Student = function () {
};
Student.prototype = new Person();
Student.prototype.learn = function (subject) {
  console.log(this.name + " just learned " + subject);
}
var me = new Student();
me.initialize("John", 25);
me.learn("Inheritance");

const Teacher = function () {
};
Teacher.prototype = new Person();
Teacher.prototype.teach = function (subject) {
  return `${this.name} is now teaching ${subject}`;
}
