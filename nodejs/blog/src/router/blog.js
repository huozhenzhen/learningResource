const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel")

const loginCheck = (req) => {
    if(!req.session.username) {
        return Promise.resolve(new ErrorModel("尚未登录"))
    }
}
const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id
    //获取blog列表
    if (method === "GET" && req.path === "/api/blog/list") {
        let author = req.session.username || ""
        const keyword = req.query.keyword || ""
        
        const result = getList(author, keyword);
        return result.then(list => {
            return new SuccessModel(list, "获取blog列表成功")
        })
    }
    //获取blog列表详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data, '获取blog列表详情成功')
        })
    }
    //新建一篇blog
    if (method === "POST" && req.path === "/api/blog/new") {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data, '新建一篇成功')
        })
    }
    //更新blog列表
    if (method === "POST" && req.path === "/api/blog/update") {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = updateBlog(id, req.body);
        return result.then(isSuc => {
            if (isSuc) {
                return new SuccessModel(null, '更新blog列表成功')
            } else {
                return new ErrorModel(null, '更新blog列表失败')
            }

        })
    }
    //删除blog列表
    if (method === "POST" && req.path === "/api/blog/delete") {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult) {
            return loginCheckResult
        }   
        req.body.author = req.session.username;
        console.log(id, req.body.author)
        const result = deleteBlog(id, req.body.author);
        return result.then(isSuc => {
            if (isSuc) {
                return new SuccessModel(null, '删除blog列表成功')
            } else {
                return new ErrorModel(null, '删除blog列表失败')
            }

        })
    }
}

module.exports = handleBlogRouter
