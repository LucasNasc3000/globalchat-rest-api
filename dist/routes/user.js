"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _User = require('../controllers/User'); var _User2 = _interopRequireDefault(_User); // O home controller não é importado aqui com maiúsculo para não ser importado como objeto da classe em vez da classe em si, porque a classe já tem o 'h' maiúsculo
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _User2.default.store); // Cria o usuário
router.get('/', _loginRequired2.default, _User2.default.usersList); // Lista todos os usuários, com todos os seus dados
router.delete('/:id', _loginRequired2.default, _User2.default.delete); // Deleta um usuário e seus dados
router.put('/:id', _loginRequired2.default, _User2.default.update); // Atualiza os dados do usuário. Também é usado para a função de banir

exports. default = router;
