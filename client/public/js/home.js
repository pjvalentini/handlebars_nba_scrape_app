// ajax get '/api/scrape' then (res) $('#team-info').append(res[0])

/* global $ */
$(document).ready(function() {
	$.ajax({
		method: 'GET',
		url: '/api/scrape',
	}).then((res) => {
		console.log(res);
		var teamName = $("<h2>", {
			text: res[0].team,
		});
		// console.log(res[0].team);
		var pointsPG = $("<h2>", {
			text: res[0].ppg,
		});
		// console.log(res[0].ppg);
		$("#team-info").append(teamName).append(pointsPG);

		var teamCounter = 0;

		$("#next-button").click(function(index) {
			 console.log("next clicked!");
			$("#team-info").empty();
			res[teamCounter].team;
			res[teamCounter].ppg;
			teamCounter++;
			console.log(teamCounter);
		});

		$("#prev-button").click(function() {
			$("#team-info").empty();
			res[teamCounter].team;
			res[teamCounter].ppg;
			teamCounter--;
			console.log(teamCounter);
			console.log("prev clicked!");
		});
	});
});
