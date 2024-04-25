"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Emails = require('../controllers/Emails'); var _Emails2 = _interopRequireDefault(_Emails);
// import loginRequired from '../middlewares/loginRequired';

const router = new (0, _express.Router)();

router.post('/', _Emails2.default.SendEmail); // envia emails

exports. default = router;
