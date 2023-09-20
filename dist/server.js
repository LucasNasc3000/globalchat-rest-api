"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
// eslint-disable-next-line import/no-unresolved, import/extensions, import/no-useless-path-segments
require('./database');

const port = process.env.APP_PORT;

_app2.default.listen(port);
