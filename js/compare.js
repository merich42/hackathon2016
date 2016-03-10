
		$(document).ready(function() {
					var job0 = getUrlParameter("job0");
					var job1 = getUrlParameter("job1");
					var job2 = getUrlParameter("job2");

			$.ajax({
				type: "GET",
				url: "xml/tmp-feed.xml",
				dataType: "xml",
				success: function(xml){
					var count = $(xml).find("VIPER_JOB").size();
					//for each url params get value
					if(job0.length > 0 || job1.length > 0 || job2.length > 0){
						$(xml).find('VIPER_JOB').each(function(){
						
							var jobID = $(this).find("JDTID_UNIQUE_NUMBER").text();
							if (jobID == job0 || jobID == job1 || jobID == job2){
								var jobTitle = $(this).find("JOB_TITLE").text();
								var jobDescription = $(this).find("TEXT").text();
								var jobCategory = $(this).find("JOB_CATEGORY").text();
								var jobSalary = $(this).find("JOB_SALARY_FROM").text()+" - "+$(this).find("JOB_SALARY_TO").text();
								var jobQualifications = "<ul>";
								jobQualifications += $(this).find("QUALIFICATIONS").text();
								jobQualifications = jobQualifications.replace("*","<li>");
								jobQualifications = jobQualifications.replace("REQUIREMENTS: ","");
								jobQualifications = jobQualifications.replace("&#x2022;","</li><li>");
								jobQualifications = jobQualifications.replace(/\*/g,"</li><li>");
								jobQualifications += "</li></ul>";
								var City = $(this).find("JOB_LOCATION_CITY").text();
								var State = $(this).find("JOB_LOCATION_STATE").text();
								var Country = $(this).find("JOB_LOCATION_COUNTRY").text();
								var JobZipCode = $(this).find("JOB_LOCATION_ZIP").text();
								var StartDate = $(this).find("ASSIGNMENT_START_DATE").text();
								var Relocation = $(this).find("RELOCATION").text();
								var JOB_STATUS = $(this).find("JOB_STATUS").text();
								var TRAVEL = $(this).find("TRAVEL").text();
								var url = $(this).find("JOB_APPLY_URL").text();
								var apply = "<a href='"+url+"'s class=\"job-apply\">Apply Now</a>";
								var moreDetails = "<p>"+jQuery.trim(jobDescription).substring(0, 200).split(" ").slice(0, -1).join(" ") + "..."+"</p><a href='\job-details.html?id="+jobID+"'>More Details</a>";
								//first item is title
								$('.flex section:first-of-type').append("<div><h2><a href='\job-details.html?id="+jobID+"'>"+jobTitle+"</a></h2><a class=\"close\" href=\"#\"><span>Remove Job</span></a>");
								//second item is salary
								$('.flex section:nth-of-type(2)').append("<div>"+jobSalary+"</div>");
								//third is location
								$('.flex section:nth-of-type(3)').append("<div>"+City+", "+State+"</div>");
								//fourth is quals
								$('.flex section:nth-of-type(4)').append("<div>"+jobQualifications+"</div>");
								//fifth is relocation
								$('.flex section:nth-of-type(5)').append("<div>"+Relocation+"</div>");
								//sixth is full/part
								$('.flex section:nth-of-type(6)').append("<div>"+JOB_STATUS+"</div>");
								//seventh is travel
								$('.flex section:nth-of-type(7)').append("<div>"+TRAVEL+"</div>");
								//ninth is job apply
								$('.flex section:nth-of-type(9)').append("<div>"+apply+"</div>");
								//eighth is more details
								$('.flex section:nth-of-type(8)').append("<div>"+moreDetails+"</div>");
							}
						});
					}
					
					$('.close').click(function(e){
						e.preventDefault();
						var ind = $(this).parent("div").index();
						$('.flex section div:nth-of-type('+ind+')').remove();
						if($('.flex section div').length == 0){
							$(".flex").hide();
							$(".page-content-container").append("<h3>Oops</h3><p>Looks like you closed all your jobs, please search again to compare more jobs.</p>");
						}
					});
				}
			});
			
			
		});
		
		function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		}