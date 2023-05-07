"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    User: function() {
        return User;
    },
    Blog: function() {
        return Blog;
    },
    Book: function() {
        return Book;
    },
    Vehicle: function() {
        return Vehicle;
    },
    Comment: function() {
        return Comment;
    },
    default: function() {
        return _default;
    }
});
const _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
const { user: User , blog: Blog , book: Book , vehicle: Vehicle , comment: Comment  } = prisma;
const _default = prisma;
