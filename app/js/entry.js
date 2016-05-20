
const angular = require('angular');
const heroApp = angular.module('heroApp', []);

require('./heros')(heroApp);
require('./villains')(heroApp);
require('./battle')(heroApp);
