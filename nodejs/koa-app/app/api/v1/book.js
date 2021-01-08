const Router = require('koa-router')
const {
    Auth
} = require('@middlewares/auth')
const router = new Router({
    prefix: '/v1/book'
})
const {
    HotBook
} = require('@models/hotBook')
const {
    Book
} = require('@models/Book')
const {
    PositiveInterValidator,
    BookSearchValidator,
    addShortCommentValidator
} = require('@validators/validator')
const {
    Favor
} = require('@models/favor')
const {
    Comment
} = require('@models/comment')



router.get('/hotBookList', new Auth().m, async (ctx, next) => {
    const list = await HotBook.getAll()
    ctx.body = new global.infos.Success(list)
});

router.get('/:id/detail', new Auth().m, async (ctx, next) => {
    const v = await new PositiveInterValidator().validate(ctx)
    const book = new Book(v.get('path.id'))
    const detail = await book.detail()
    ctx.body = new global.infos.Success(detail)
});

router.get('/search', new Auth().m, async (ctx, next) => {
    const v = await new BookSearchValidator().validate(ctx)
    const list = await Book.searchFromYuShu(
        v.get('query.q'),
        v.get('query.start'),
        v.get('query.count'),
    )
    ctx.body = new global.infos.Success(list)
});

router.get('/favor/count', new Auth().m, async (ctx, next) => {
    const count = await Favor.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = new global.infos.Success({
        count
    })
});

router.get('/:bookId/favor', new Auth().m, async (ctx, next) => {
    const v = await new PositiveInterValidator().validate(ctx, {
        id: 'bookId'
    })

    const favor = await Favor.getBookFavorInfo(v.get('path.bookId'), ctx.auth.uid)
    ctx.body = new global.infos.Success(favor)
});

router.post('/add/comment', new Auth().m, async ctx => {
    const v = await new addShortCommentValidator().validate(ctx, {
        id: 'bookId'
    })
    const result = await Comment.addComment(v.get('body.bookId'), v.get('body.content'))
    ctx.body = new global.infos.Success(result)
})

router.get('/:bookId/comment', new Auth().m, async ctx => {
    const v = await new PositiveInterValidator().validate(ctx, {
        id: 'bookId'
    })
    const comments = await Comment.getComment(v.get('path.bookId'))
    
    ctx.body = new global.infos.Success(comments)
})


module.exports = router