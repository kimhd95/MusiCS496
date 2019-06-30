var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
const pg = require('pg');
const pool = new pg.Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'webstore',
	password: 'Lelouch4987*',
	port: '5432'
});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/index.html'));
});

router.get('/index.html', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/index.html'));
});
router.get('/musicplayer.html', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/musicplayer.html'));
});
router.get('/searchtag.html', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/searchtag.html'));
});
router.get('/generic.html', function(req, res, next) {
  //res.sendFile(path.join(__dirname+'/../views/generic.html'));
	const query = pool.query("SELECT * FROM bugs ORDER BY artist LIMIT 300", function(err, result) {
		if (err) throw err;
		//console.log(result.body);
		res.render('generic', { array: result.rows });
	});
});
router.get('/genreview', function(req, res, next) {
  //res.sendFile(path.join(__dirname+'/../views/generic.html'));
	console.log("requested");
	const query = pool.query("SELECT * FROM bugs WHERE genre=\'Rap/Hip-Hop\' LIMIT 200", function(err, result) {
		if (err) throw err;
		//console.log(result.body);
		console.log(query);
		res.render('genreview', { array: result.rows });
	});
});
router.get('/elements.html', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/elements.html'));
});





router.get('/assets/css/main.css', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/css/main.css'));
});
router.get('/assets/js/jquery.min.js', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/js/jquery.min.js'));
});
router.get('/assets/js/browser.min.js', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/js/browser.min.js'));
});
router.get('/assets/js/util.js', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/js/util.js'));
});
router.get('/assets/js/main.js', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/js/main.js'));
});
router.get('/assets/js/breakpoints.min.js', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/js/breakpoints.min.js'));
});
router.get('/assets/css/font-awesome.min.css', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/css/font-awesome.min.css'));
});
router.get('/assets/fonts/fontawesome-webfont.woff?v=4.7.0', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/css/fontawesome-webfont.woff'));
});
router.get('/assets/fonts/fontawesome-webfont.woff2?v=4.7.0', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/assets/css/fontawesome-webfont.woff2'));
});
router.get('/images/logo.svg', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/images/logo.svg'));
});
router.get('/images/pic01.jpg', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/images/pic01.jpg'));
});
router.get('/images/pic02.jpg', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/images/pic02.jpg'));
});
router.get('/images/pic03.jpg', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/images/pic03.jpg'));
});

router.get('/play.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/play.png'));
});
router.get('/stop2.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/stop2.png'));
});
router.get('/previous.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/previous.png'));
});
router.get('/next.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/next.png'));
});
router.get('/volume.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/volume.png'));
});
router.get('/drop.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/drop.png'));
});
router.get('/pause.png', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../views/pause.png'));
});







router.get('/select.html', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/select.html'));
});
router.get('/logo.html', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/logo.html'));
});
router.get('/music.gif', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/music.gif'));
});
router.get('/player.html', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/player.html'));
});
router.get('/getLyrics.js', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/getLyrics.js'));
});
router.get('/jsmediatags.js', function(req, res) {
  res.sendFile(path.join(__dirname+'/../views/jsmediatags.js'));
});
router.get('/showyoutubecontent.ejs', function(req, res) {
	res.sendFile(path.join(__dirname+'/../views/showyoutubecontent.ejs'));
})

router.post('/addBugs', function(req, res) {
  pool.query("INSERT INTO bugs VALUES(\'"+req.body.m_artist+"\', \'"+req.body.m_title+"\', \'"+req.body.m_album+"\', \'"+req.body.m_genre +"\')");
  // console.log(req.body);
  res.send('1')
});

router.post('/addSongswithTag', function(req, res) {
  pool.query("INSERT INTO songswithTag VALUES(\'"+req.body.title+"\', \'"+req.body.artist+"\', \'"+req.body.tag +"\')");
  // console.log(req.body);
  res.send('1')
});

router.post('/requesttags', function(req, res) {
	var tag_weather = req.body.weather;
	var tag_emotion = req.body.emotion;
	var tag_condition = req.body.condition;
  const query = pool.query("SELECT * FROM songswithtag WHERE tag = \'" + tag_weather + "\' or tag = \'" + tag_emotion + "\' or tag = \'" + tag_condition + "\'", function(err, result) {
		if (err) throw err;
		res.render('tagged', { array: result.rows });
		//console.log(result.rows);
  });
  //res.sendFile(path.join(__dirname+'/../views/select.html'));
});

router.post('/showcontent', function(req, res) {
	console.log(req.body);
	const queryInYoutube = pool.query("SELECT artist, title, views, link FROM youtubecontents WHERE artist like \'%" + req.body.artist + "%\'", function(err, result) {
		if (err) throw err;
		res.render('showyoutubecontent', { array: result.rows });
		console.log(result.rows);
	});
});



module.exports = router;
