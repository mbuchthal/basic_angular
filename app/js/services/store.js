
module.exports = function(app) {
  app.factory('store', function() {
    return {
      count: 0,
      addCount: function() {
        this.count++;
      },
      getCount: function() {
        return this.count;
      }
    };
  });
};
