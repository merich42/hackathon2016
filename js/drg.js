$(document).ready(function () {

	//

});

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Callback that creates and populates a data table, instantiates the chart, passes in the data and draws it.
function drawChart(chartID,jobTitle,jobLocation) {
	
	//need a way to pass in jobTitle, jobLocation to api to return salary data
	
	// Create the data table.
	// examples using json - Google referece
	//https://developers.google.com/chart/interactive/docs/php_example
	//https://developers.google.com/chart/interactive/docs/reference#dataparam
	
	var jsonData = $.ajax({
          url: "/data/chartdata.json", // using static data now but need to call PayScale api and return dynamic data based on job title and location
          dataType: "json",
          async: false
          }).responseText;
	
	var data = new google.visualization.DataTable(jsonData);
	
	/*
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Range');
	data.addColumn('number', 'Salary');
	data.addRows([
	  ['low', 50000],
	  ['typical', 75000],
	  ['high', 100000]
	]);
	*/
	
	// Set chart options	   
	var options = {'title':'Typical Salary Range for this type of position','height':200};			   
	
	// Instantiate and draw our chart, passing in some options.
	var currChart = $('[data-job-id="' + chartID + '"] + .sr-details > div > div')[0];
	var chart = new google.visualization.BarChart(currChart);
	chart.draw(data, options);
	
}

function addJobDetailContainer() {
	
	// Adds the Details button and chart container --- called after ajax success
	
	$('#search-results-list li').each(function() {				
		console.log($(this).find('h2').text());
		$(this).append('<div class="sr-details"><a href="#" class="btn-sr-detail">Details</a><div><p>Detail about ' + $(this).find('h2').text() + '</p><div id="chart_div"></div></div></div>');
	});	
}

function initBtnSRDetail(){
	
	$('.btn-sr-detail').click(function(e){
		e.preventDefault();
		$(this).next().slideToggle();
		$(this).toggleClass('active');
		
		var currJob = $(this).parent().parent().find('[data-job-id]');
		var dataJobId = currJob.attr('data-job-id');
		var dataJobTitle = currJob.find('h2').text();
		var dataJobLocation = currJob.find('.job-location').text();

		console.log('currJob: ' + currJob);
		console.log('dataJobId: ' + dataJobId);
		console.log('dataJobTitle: ' + dataJobTitle);
		console.log('dataJobLocation: ' + dataJobLocation);
		
		// Set a callback to run when the Google Visualization API is loaded.
		if(!$(this).hasClass('drawn'))google.charts.setOnLoadCallback(drawChart(dataJobId,dataJobTitle,dataJobLocation));
		$(this).addClass('drawn');
		
	});	
}



