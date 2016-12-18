var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');
var basePath = "/list";

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(connection(mysql, {
    host: 'localhost',
    user: 'personuser',
    password: 'personuser123',
    database: 'persontbl'
}, 'request'));

var getListObj = {
    grocery: {
        query: "SELECT * FROM groccerytbl",
        url: basePath + "/grocery",
        ids: []
    },
    groceryId: {
        query: "SELECT * FROM groccerytbl where grocceryid =?",
        url: basePath + "/grocery/:gid",
        ids: ["gid"]
    }
};

var putListObj = {
    grocery: {
        query: "UPDATE groccerytbl SET ? WHERE grocceryid =?",
        url: basePath + "/grocery/:gid",
        ids: ["gid"]
    }
};

var delListObj = {
    grocery: {
        query: "DELETE FROM groccerytbl where grocceryid =?",
        url: basePath + "/grocery/:gid",
        ids: ["gid"]
    }
};

var postListObj = {
    grocery: {
        query: "INSERT into groccerytbl set ?",
        url: basePath + "/grocery",
        ids: []
    }
};

for (var key in getListObj) {
    getList(getListObj[key].url, getListObj[key].ids, getListObj[key].query);
}

for (var key in putListObj) {
    putList(putListObj[key].url, putListObj[key].ids, putListObj[key].query);
}

for (var key in delListObj) {
    deleteList(delListObj[key].url, delListObj[key].ids, delListObj[key].query);
}

for (var key in postListObj) {
    postList(postListObj[key].url, postListObj[key].ids, postListObj[key].query);
}

function getList(url, ids, query) {
    app.get(url, function (req, res, next) {
        req.getConnection(function (err, connection) {
            if (err) return next(err);

            connection.query(query, req.params[ids], function (err, results) {
                if (err) {
                    console.log(err);
                    return next("My sql error, check getList query");
                }
                res.json(results);
            });
        });
    });
}

function putList(url, ids, query) {
    app.put(url, function (req, res, next) {
        var id = req.params[ids];
        var reqObj = req.body;
        req.getConnection(function (err, connection) {
            if (err) return next(err);

            connection.query(query, [reqObj, id], function (err, results) {
                if (err) {
                    console.log(err);
                    return next("My sql error, check putList query");
                }
                res.json(results);
            });
        });
    });
}

function postList(url, ids, query) {
    app.post(url, function (req, res, next) {
        req.getConnection(function (err, connection) {
            if (err) return next(err);

            connection.query(query, req.body, function (err, results) {
                if (err) {
                    console.log(err);
                    return next("My sql error, check postList query");
                }
                res.json(results);
            });
        });
    });
}

function deleteList(url, ids, query) {
    app.delete(url, function (req, res, next) {

        req.getConnection(function (err, connection) {
            if (err) return next(err);

            connection.query(query, req.params[ids], function (err, results) {
                if (err) {
                    console.log(err);
                    return next("My sql error, check deleteService query");
                }
                res.json(results);
            });
        });
    });
}

app.use(express.static(__dirname + '/'));

app.get('/product', function (req, res) {
    res.redirect('/views/index.html');
});

app.listen(3100, function (req, res) {
    console.log('Listening to the port 3100');
});