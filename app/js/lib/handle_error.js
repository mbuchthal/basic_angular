
module.exports = function(err) {
  console.log(err);
  this.errors = (this.errors || []).push(err);
};
