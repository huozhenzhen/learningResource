const {
    LinValidator,
    Rule
} = require('@root/core/lin-validator-v2')
const {
    User
} = require('@models/user')
const {
    ArtType,
    LoginType
} = require('@lib/enum')


class PositiveInterValidator extends LinValidator {
    constructor() {
        super()
        this.id = [new Rule('isInt', '需要正整数', {
            min: 1
        })]
    }
}

class LikeValidator extends PositiveInterValidator {
    constructor() {
        super()
        this.validateType = function (vals) {
            if (!vals.body.type) {
                throw new Error('type是必须的')
            }
            if (!ArtType.isThisType(vals.body.type)) {
                throw new Error('type参数不合法')
            }
        }
    }
}

class ClassicValidator extends PositiveInterValidator {
    constructor() {
        super()
        this.validateType = function (vals) {
            if (!vals.path.type) {
                throw new Error('type是必须的')
            }
            if (!ArtType.isThisType(vals.path.type)) {
                throw new Error('type参数不合法')
            }
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不能为空', {
                min: 1
            })

        ]
    }

}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [new Rule('isLength', '不符合账号规则', {
            min: 4,
            max: 32
        })]
        this.secret = [
                new Rule('isOptional'),
                new Rule('isLength', '6-128字符', {
                    min: 6,
                    max: 128
                })
            ],
            this.type = function (vals) {
                if (!vals.body.type) {
                    throw new Error('type是必须的')
                }
                if (!LoginType.isThisType(vals.body.type)) {
                    throw new Error('type参数不合法')
                }
            }
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [new Rule('isEmail', '邮箱错误')]
        this.password = [new Rule('isLength', '6-32字符', {
            min: 6,
            max: 32
        })]
        this.passwordCopy = this.password
        this.nickName = [new Rule('isLength', '6-32字符', {
            min: 4,
            max: 32
        })]
    }
    validatePassword(vals) {
        const {
            password,
            passwordCopy
        } = vals.body
        if (passwordCopy !== password) {
            throw new Error('密码不一致')
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (user) {
            throw new Error('邮箱已经存在')
        }
    }
}

class BookSearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = new Rule('isLength', '搜索关键词不能为空', {
            min: 1,
            max: 16
        })
        this.start = [
            new Rule('isInt', '不符合规范', {
                min: 0,
                max: 100000
            }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', '不符合规范', {
                min: 1,
                max: 20
            }),
            new Rule('isOptional', '', 20)
        ]
    }
}

class addShortCommentValidator extends PositiveInterValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '1-24之间', {
                min: 1,
                max: 12
            })
        ]
    }
}

module.exports = {
    PositiveInterValidator,
    RegisterValidator,
    LikeValidator,
    ClassicValidator,
    TokenValidator,
    NotEmptyValidator,
    BookSearchValidator,
    addShortCommentValidator
};