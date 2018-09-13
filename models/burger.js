var orm = require("../config/orm.js");

var burger = {
    selectAll: function(combine) {
        orm.selectAll('burgers', function(res) {
            combine(res);
        });
    },
    insertOne: function(Col, val, combine) {
        orm.insertOne('burgers', Col, val, function(res) {
            combine(res);
        });
    },
    updateOne: function(itmValofCol, condition, combine) {
        orm.updateOne('burgers', itmValofCol, condition, function(res) {
            combine(res);
        });
    }
};

module.exports = burger;