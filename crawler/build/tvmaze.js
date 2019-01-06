"use strict";
exports.__esModule = true;
var request = require("request");
var ShowCast = require("../../rest/models/showcast");
var urlRoot = 'api.tvmaze.com';
var uriShow = '/shows';
var uriCast = function (showid) { return uriShow + "/" + showid; };
function requester(options, cb) {
    if (cb === void 0) { cb = console.log; }
    setTimeout(function () {
        var url = "http://" + options.host + options.path;
        console.log(url);
        request({ url: url, qs: options.qs }, function (err, r, body) {
            if (err) {
                console.log(err);
                return;
            }
            if (r.statusCode === 200) {
                cb(body);
            }
            else {
                console.log("status code " + r.statusCode);
            }
        });
    }, 3000);
}
function getShows(cb) {
    if (cb === void 0) { cb = console.log; }
    var options = {
        'host': urlRoot,
        'path': uriShow
    };
    requester(options, cb);
}
function handleCastInfo(data) {
    var d = JSON.parse(data);
    var showid = d.id;
    var casts = [];
    for (var i in d._embedded.cast) {
        var c = d._embedded.cast[i].person;
        var e = { id: c.id, name: c.name, birthday: c.birthday };
        casts.push(e);
    }
    sortByDateDescending(casts, 'birthday');
    var showcast = new ShowCast();
    showcast.id = showid;
    showcast.name = d.name;
    showcast.cast = casts;
    showcast.save(function (err) {
        if (err)
            console.log(err.errmsg);
    });
}
/** sorts key-values by date descending */
function sortByDateDescending(obj, key) {
    return obj.sort(function (a, b) {
        var x = new Date(a[key]);
        var y = new Date(b[key]);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
function handleShows(data) {
    var obj = JSON.parse(data);
    for (var o in obj) {
        var cobj = obj[o];
        console.log(cobj.id + "\t" + cobj.name);
        var options = {
            host: urlRoot,
            path: uriCast(cobj.id),
            qs: { embed: 'cast' }
        };
        requester(options, handleCastInfo);
    }
}
getShows(handleShows);
