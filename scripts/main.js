/*
 * InstilledBee.net mini-portfolio page
 * Main JS functions
 *
 * Make sure to include jQuery and Sticky-Kit before including this
 */

// -- Begin JSON parsing functions -- //
$.getJSON("projects.json", function(data, textStatus, jqXHR) {
	console.log(data.projects);
	var itemsDiv = $("#projects");
	itemsDiv.find(".wrapped-content").detach();
	
	// Iterate through each found JSON item in the JSON array
	$.each(data.projects, function(index, val) {
		var isOdd = (index % 2) == 1;
		
		// Create new elements.
		var newItem = $("<div class=\"wrapped-content\"></div>");
		var newItemDiv = $("<div class=\"content\"></div>");
		var newItemImg = $("<a href=\"" + val.url + "\" target=\"_blank\"><img src=\"" + val.img + "\" class=\"item-image\" /></a>");
		var newItemDesc = $("<div class=\"item-desc\"></div>");
		var newItemHeader = $("<div class=\"item-header\"></div>");
		
		// Append content to created elements, starting from the innermost elements.
		newItemHeader.append("<h2 class=\"item-title\">" + val.title + "</h2>");
		newItemHeader.append("<h3 class=\"location\"><a href=\"" + val.url + "\">" + val.url + "</a></h3>");
		
		newItemDesc.append(newItemHeader);
		newItemDesc.append("<p>" + val.desc + "</p>");
		
		newItemDiv.append(newItemDesc);
		newItemDiv.append(newItemImg);
		
		newItem.append(newItemDiv);
		
		// Apply some fancy styles to odd/even items
		if(isOdd) {
			newItem.addClass("odd-item");
			newItemImg.addClass("right");
			newItemDesc.addClass("left");
		}
		
		else {
			newItem.addClass("even-item");
			newItemImg.addClass("left");
			newItemDesc.addClass("right");
		}
		
		// Finally, add the highest created element into its proper location in the existing DOM tree.
		itemsDiv.append(newItem);
	});
	
	// Account for the newly added <div>'s
	$(document.body).trigger("sticky_kit:recalc");
	
	// Make external links open in a new window
	$("a[href^=http]").each(function() {
		if(this.href.indexOf(location.hostname) == -1) {
			 $(this).attr("target", "_blank");
		}
	});
})
	// We should at least let the user know the JSON file had problems.
	.fail(function(jqXHR, status, err) {
		$("#projects").find("h2").html("error loading projects data");
		console.log("JSON load: " + status);
		console.log("JSON load error: " + err);
	});
	
// -- End JSON parsing functions -- //

// Stick the header when the viewport is scrolled.
$("header").stick_in_parent();

// Account for re-sticking the header to the top should the viewport be resized.
$(window).resize(function() {
	$(document.body).trigger("sticky_kit:recalc");
});

// Make all external links open in a new window
// Original code taken from http://www.dzone.com/snippets/use-jquery-make-all-external
$(document).ready(function() {
	$("a[href^=http]").each(function() {
		if(this.href.indexOf(location.hostname) == -1) {
			 $(this).attr("target", "_blank");
		}
	})
});