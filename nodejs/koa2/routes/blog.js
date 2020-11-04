const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck")
router.prefix('/api/blog')
/* GET users listing. */
router.get('/list', async (ctx, next) => {
  let author = ctx.session.username || ""
  const keyword = ctx.query.keyword || ""
  const list = await getList(author, keyword);
  ctx.body = new SuccessModel(list, "获取blog列表成功")
});

router.get('/detail', loginCheck, async (ctx, next) => {
  const id = ctx.query.id
  const data = await getDetail(id)
  ctx.body = new SuccessModel(data, "获取blog列表详情成功")
});

router.post('/new', loginCheck, async (ctx, next) => {
  ctx.request.body.author = ctx.session.username;
  const data = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(data, '新建一篇成功')
})

router.post('/update', loginCheck, async (ctx, next) => {
  const id = ctx.query.id
  ctx.request.body.author = ctx.session.username;
  const isSuc = await updateBlog(id, ctx.request.body)
  if (isSuc) {
    ctx.body = new SuccessModel( '更新blog列表成功')
  } else {
    ctx.body = new ErrorModel(null, '更新blog列表失败')
  }
})

router.post('/delete', loginCheck, async (ctx, next) => {
  const id = ctx.query.id
  const author = ctx.session.username;
  const isSuc = await deleteBlog(id, author)
  if (isSuc) {
    ctx.body = new SuccessModel('删除blog列表成功')
  } else {
    ctx.body = new ErrorModel('删除blog列表失败')
  }
})


module.exports = router
