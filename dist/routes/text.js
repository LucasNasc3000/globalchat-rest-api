"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _Text = require('../controllers/Text'); var _Text2 = _interopRequireDefault(_Text); // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _Text2.default.store); // cria as mensagens
router.get('/', _loginRequired2.default, _Text2.default.index); // mostrar mensagens e quem enviou
router.delete('/:id', _loginRequired2.default, _Text2.default.delete); // deleta mensagens
router.delete('/', _loginRequired2.default, _Text2.default.deleteAll); // deleta mensagens

exports. default = router;
