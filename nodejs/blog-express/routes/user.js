var express = require('express');
var router = express.Router();
const { login } = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck")

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      data.roles = eval(data.roles)
      req.session = Object.assign(req.session, data)
      res.json(new SuccessModel({ userId: req.sessionID }, "登录成功"));
      return
    } else {
      res.json(new ErrorModel("登录失败"));
    }
  })
});

router.get('/info', loginCheck, function (req, res, next) {
  res.json(new SuccessModel(req.session, "获取用户信息成功"));
});


module.exports = router;
