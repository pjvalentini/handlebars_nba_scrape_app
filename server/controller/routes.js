var models = require('../models');
var express = require('express');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');

models.sequelize.sync();

var router = express.Router();

router.get('/', function(req,res) {
	models.Stat.findAll().then((stats) => {
		// console.log(stats);
		var teamStats = [];
		stats.forEach((stat) => {
			teamStats.push(stat);
			// console.log(teamStats);
		});
    // or
    res.render('home', { stats: teamStats });
		// res.render('home', { stats: stats });
	});
});

// run through postmant to populate the the handlebars_nba_scrape DB
router.get("/api/scrape", function(req,res) {
	request('http://www.espn.com/nba/statistics/team/_/stat/team-comparison-per-game', function(err, response, html) {
		if (err) {
			throw err;
		}
		var $ = cheerio.load(html);
		var results = [];
    // look for the containing div that holds the entire table you want to scrape.
    // $('.mod-table') in this case. Find this in the console => elements
		$('.mod-table').each(function(index, element) {
			// console.log(index);
			var table = $(element).find("table");
			table.each(function() {
				var tr = $(this).find("tr");
				tr.each(function() {
					var team = $(this).find("td").eq(1).text().trim();
					// console.log(team);
					var ppg = $(this).find("td").eq(2).text().trim();
					// console.log(ppg);
          // this conditional tests is fields have letters...
          // you can cl it. console.log(ppg.match(/[A-Za-z]/) == null);
					if (ppg.match(/[A-Za-z]/) == null) { // eslint-disable-line
						results.push({ team: team, ppg: parseFloat(ppg) });
						// console.log(ppg.match(/[A-Za-z]/) == null);
					}
				});
			});
		});
    // console.log(results); // in order to see this CL you need to run through postman, will return the srape in the terminal!
		models.Stat.bulkCreate(results);
		// res.json(results);
	});
});
module.exports = router;
