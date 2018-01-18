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
		// $("#team-info").append(teamName).append(pointsPG);

		var teamCounter = 0;

		$("#prev-button").hide();

		$("#next-button").click(function() {
			$("#team-info").empty();
			$("#prev-button").show();
			var teamStatsName = res[teamCounter].team;
			var ppgStats = res[teamCounter].ppg;
			teamCounter++;
			// console.log(teamCounter);
			// console.log("next clicked!");
			// console.log(res[teamCounter].team);
			// console.log(res[teamCounter].ppg);
			$("#team-info").append(teamStatsName + " - ").append(ppgStats);

// these conditionals keep the range of stats intact and will prevent
// you from going pasts the values on next and prev side.
			if (teamCounter < 1) {
				$('#prev-button').hide();
			} else {
				$('#prev-button').show();
			}

				if (teamCounter == (res.length -1)) { // eslint-disable-line
					$("#next-button").hide();
				} else {
					$("#next-button").show();
				}
		});

		$("#prev-button").click(function() {
			$("#team-info").empty();
			var teamStatsName = res[teamCounter].team;
			var ppgStats = res[teamCounter].ppg;
			teamCounter--;
			// console.log(res[teamCounter].team);
			// console.log(res[teamCounter].ppg);
			// console.log(teamCounter);
			// console.log("prev clicked!");
			$("#team-info").append(teamStatsName + " - ").append(ppgStats);

// these conditionals keep the range of stats intact and will prevent
// you from going pasts the values on next and prev side.
			if (teamCounter < 1) {
				$('#prev-button').hide();
			} else {
				$('#prev-button').show();
			}

			if(teamCounter == (res.length - 1)) { // eslint-disable-line
				$('#next-button').hide();
			} else {
				$('#next-button').show();
			}
		});
	});
});
