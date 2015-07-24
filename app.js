var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var fs = require('fs');

for (var i = 1; i <= 50; i++) {
	(function closure(k) {
		fs.mkdir('OnePieceBooks/chapter' + k, function () {
			request('http://mangasee.me/manga/?series=OnePiece&chapter=' + k + '&index=1', function (err, res, body) {
				if (err) {
					throw err;
				} else {
					var cheer = cheerio.load(body);
					cheer('.img-responsive').each(function (index) {
						var file = fs.createWriteStream('OnePieceBooks/chapter' + k + '/' + index + '.jpg');
						http.get(cheer(this)['0'].attribs.src, function (response) {
							response.pipe(file);
						});
					});
				}
			});
		});
	})(i)
}
