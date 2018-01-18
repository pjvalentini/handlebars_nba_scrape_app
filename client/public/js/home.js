// ajax get '/api/scrape' then (res) $('#team-info').append(res[0])

/* global $ */
$(document).ready(function() {
	$.ajax({
		method: 'GET',
		url: '/api/scrape',
	}).then((res) => {
		// console.log(res);
		var teamName = $("<h2>", {
			text: res[0].team,
		});
		console.log(res[0].team);
		var pointsPG = $("<h2>", {
			text: res[0].ppg,
		});
		console.log(res[0].ppg);
		$("#team-info").append(teamName).append(pointsPG);

		$("#next-button").click(function() {
			 console.log("next clicked!");

		$("#prev-button").click(function() {
			console.log("prev clicked!");
		});
		});
	});
});
