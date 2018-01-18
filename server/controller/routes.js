var models = require('../models');
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

models.sequelize.sync();

var router = express.Router();

router.get('/', function(req, res) {
	models.Stat.findAll().then((stats) => {
		// console.log(stats);
		var teamStats = [];
		stats.forEach((stat) => {
			teamStats.push(stat);
			// console.log(teamStats);
		});
		// res.json(teamStats); // returns 30 teams and ppg json object.
    res.render('home', { stats: teamStats });
		// or
		// res.render('home', { stats: stats });
	});
});

// run through postman to populate the the handlebars_nba_scrape DB
router.get("/api/scrape", function(req, res) {
	request('http://www.espn.com/nba/statistics/team/_/stat/team-comparison-per-game', function(err, response, html) {
		if (err) {
			throw err;
		}
		var $ = cheerio.load(html);
		var results = []; // change to {} ??
    // look for the containing div that holds the entire table you want to scrape.
    // $('.tablehead') in this case. Find this in the console => elements
		$('.tablehead').each(function(index, element) {
			// console.log(index);
			// console.log(element);
			// var table = $(element).find("table");
			// table.each(function() {
				var tr = $(this).find("tr");
				tr.each(function() {
					var team = $(this).find("td").eq(1).text().trim();
					// console.log(team);
					var ppg = $(this).find("td").eq(2).text().trim();
					// console.log(ppg);
          // this conditional tests if fields have letters...
          // you can cl it. console.log(ppg.match(/[A-Za-z]/) == null);
					if (ppg.match(/[A-Za-z]/) == null) { // eslint-disable-line
						results.push({ team: team, ppg: parseFloat(ppg) });
						// console.log(ppg.match(/[A-Za-z]/) == null);
						// tr.append(team).append(ppg); ????
					}
				});
			// });
		});
		res.json(results);
    // console.log(results); // in order to see this CL you need to run through postman, will return the srape in the terminal!
		// models.Stat.bulkCreate(results);
	});
});
module.exports = router;
