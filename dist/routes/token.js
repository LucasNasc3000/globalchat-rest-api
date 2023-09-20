"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Token = require('../controllers/Token'); var _Token2 = _interopRequireDefault(_Token); // O token controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 't' maiúsculo

const router = new (0, _express.Router)();

router.post('/', _Token2.default.store);

exports. default = router;
