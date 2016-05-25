
const angular = require('angular');
const heroApp = angular.module('heroApp', []);

require('./services')(heroApp);
require('./heros')(heroApp);
require('./villains')(heroApp);
require('./battle')(heroApp);
