"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _User = require('../controllers/User'); var _User2 = _interopRequireDefault(_User); // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _UserDelete = require('../controllers/UserDelete'); var _UserDelete2 = _interopRequireDefault(_UserDelete);

const router = new (0, _express.Router)();

router.get('/', _loginRequired2.default, _User2.default.usersList); // Lista todos os usuários, com todos os seus dados
router.get('/:useremail', _loginRequired2.default, _User2.default.search); // Traz os dados de um usuário
router.put('/:id', _loginRequired2.default, _User2.default.update); // Atualiza os dados do usuário (exceto email)
router.put('/:useremail', _loginRequired2.default, _User2.default.userBan); // Bane um usuário (tira o acesso à página mas não deleta a conta)
router.delete('/:id', _loginRequired2.default, _UserDelete2.default.delete); // Deleta um usuário e seus dados

exports. default = router;
