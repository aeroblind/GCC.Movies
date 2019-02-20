function Car () {
  this.id = 123
}

Car.prototype.start = function() {
  console.log(this.id);
}

export default Car;