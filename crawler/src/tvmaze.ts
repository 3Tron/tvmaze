import request = require('request');
import ShowCast = require('../../rest/models/showcast')

let urlRoot = 'api.tvmaze.com';
let uriShow = '/shows';
let uriCast = (showid) => `${uriShow}/${showid}`;

function requester(options, cb = console.log) {
    setTimeout(() => {
        let url = `http://${options.host}${options.path}`;
        console.log(url);
        request({ url: url, qs: options.qs }, (err, r, body) => {
            if (err) { console.log(err); return; }
            if (r.statusCode === 200) {
                cb(body);
            } else { console.log(`status code ${r.statusCode}`) }
        });
    }, 3000);
}

function getShows(cb = console.log) {
    let options = {
        'host': urlRoot,
        'path': uriShow
    };
    requester(options, cb);
}

function handleCastInfo(data) {
    let d = JSON.parse(data);
    let showid = d.id;
    let casts = [];
    for (let i in d._embedded.cast) {
        let c = d._embedded.cast[i].person;
        let e = { id: c.id, name: c.name, birthday: c.birthday }
        casts.push(e);
    }

    sortByDateDescending(casts, 'birthday');

    let showcast = new ShowCast();
    showcast.id = showid
    showcast.name = d.name
    showcast.cast = casts
    showcast.save((err) => {
        if (err) console.log(err.errmsg);
    });
}
/** sorts key-values by date descending */
function sortByDateDescending(obj, key) {
    return obj.sort((a, b) => {
        var x = new Date(a[key]);
        var y = new Date(b[key]);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function handleShows(data) {
    let obj = JSON.parse(data);
    for (let o in obj) {
        let cobj = obj[o];
        console.log(cobj.id + "\t" + cobj.name);
        let options = {
            host: urlRoot,
            path: uriCast(cobj.id),
            qs: { embed: 'cast' }

        }
        requester(options, handleCastInfo);
    }
}
getShows(handleShows)