"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _UserSearch = require('../controllers/UserSearch'); var _UserSearch2 = _interopRequireDefault(_UserSearch);

const router = new (0, _express.Router)();

router.get('/:id', _loginRequired2.default, _UserSearch2.default.searchById); // Pesquisa um usuário pelo id

exports. default = router;
