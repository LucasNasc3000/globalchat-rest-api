"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _text = require('./routes/text'); var _text2 = _interopRequireDefault(_text);
var _userSearchEmail = require('./routes/userSearchEmail'); var _userSearchEmail2 = _interopRequireDefault(_userSearchEmail);
var _userSearchName = require('./routes/userSearchName'); var _userSearchName2 = _interopRequireDefault(_userSearchName);
var _userSearchId = require('./routes/userSearchId'); var _userSearchId2 = _interopRequireDefault(_userSearchId);

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, {
      origin: '*',
    }));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/', _home2.default);
    this.app.use('/users/', _user2.default);
    this.app.use('/users/search/email/', _userSearchEmail2.default);
    this.app.use('/users/search/name/', _userSearchName2.default);
    this.app.use('/users/search/id/', _userSearchId2.default);
    this.app.use('/tokens/', _token2.default);
    this.app.use('/text/', _text2.default);
  }
}

exports. default = new App().app;
