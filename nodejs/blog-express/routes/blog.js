var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck")

/* GET users listing. */
router.get('/list', (req, res, next) => {
    let author = req.session.username || ""
    const keyword = req.query.keyword || ""
    const result = getList(author, keyword);
    return result.then(list => {
        res.json(new SuccessModel(list, "获取blog列表成功"))
    })
});

router.get('/detail', loginCheck, (req, res, next) => {
    const id = req.query.id
    getDetail(id).then(data => {
        res.json(new SuccessModel(data, '获取blog列表详情成功'));
    })
});

router.post('/new', loginCheck, (req, res, next) => {
    req.body.author = req.session.username;
    newBlog(req.body).then(data => {
        res.json(new SuccessModel(data, '新建一篇成功'))
    })
})

router.post('/update', loginCheck, (req, res, next) => {
    const id = req.query.id
    req.body.author = req.session.username;
    updateBlog(id, req.body).then(isSuc => {
        if (isSuc) {
            res.json(new SuccessModel(data, '更新blog列表成功'))
        } else {
            res.json(new ErrorModel(null, '更新blog列表失败'))
        }

    })
})

router.post('/delete', loginCheck, (req, res, next) => {
    const id = req.query.id
    req.body.author = req.session.username;
    deleteBlog(id, req.body.author).then(isSuc => {
        if (isSuc) {
            res.json(new SuccessModel('删除blog列表成功'))
        } else {
            res.json(new ErrorModel('删除blog列表失败'))
        }

    })
})

module.exports = router;
