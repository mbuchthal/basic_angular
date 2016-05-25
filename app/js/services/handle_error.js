
module.exports = function(app) {
  app.factory('handleError', function() {
    return function(errArr, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errArr)) {
          errArr.push(new Error(message || 'server error'));
        }
      };
    };
  });
};
