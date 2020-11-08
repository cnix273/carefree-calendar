$(document).ready(function() {
    // Get elements from HTML
    var timeblocks = $(".container");
    var currentDay = $("#currentDay");

    // Get current date from moment
    var now = moment();
    var date = now.format('dddd, MMMM Do, YYYY')
    currentDay.text("The current date is: " + date);
    currentDay.attr("style", "font-weight: bold");

    // Get current time from moment
    var time = now.format("H");

    // Create variables
    var hour = 0;
    var hourDisplay = 0;
    var ampm = "";
    var plansHour = "";

    for (i=0; i<9; i++) {
        
        // Set hour
        hour = i + 9;
        if (hour > 12) {
           hourDisplay = hour - 12;
           ampm = "PM";
        }
        else {
            hourDisplay = hour;
            ampm = "AM";
        }

        // Create row
        var row = $("<form>").addClass("row time-block").attr("id", i);
        timeblocks.append(row);

        // Create hour of day column
        var col1 = $("<div>").addClass("col-sm-1 hour").text(hourDisplay + ampm);
        $("#" + i).append(col1);

        // Create text input column
        var col2 = $("<textarea>").addClass("col-sm-10 description").attr("id", "text" + i);
        $("#" + i).append(col2);

        // Set text content of text area to stored value
        var planTextDisplay = localStorage.getItem(i);
        if (planTextDisplay != null) {
            console.log(planTextDisplay);
            $("#text" + i).val(planTextDisplay);
        }

        // Set background color of text area based on time
        if (hour == time) {
            col2.addClass("present")
            col2.removeClass("past");
            col2.removeClass("future");
        }
        if (hour < time) {
            col2.removeClass("present")
            col2.addClass("past");
            col2.removeClass("future");
        }
        if (hour > time) {
            col2.removeClass("present")
            col2.removeClass("past");
            col2.addClass("future");
        }

        // Create save button
        var col3 = $("<button>").addClass("col-sm-1 saveBtn").attr({"id": "btn" + i, "aria-label": "Save"});
        $("#" + i).append(col3);
    }

    // Add save icon to save button
    $("button").append('<span class="fas fa-save"></span>');

    // Locally store text content when plan is submitted
    $("button").click(function(event) {
        event.preventDefault();
        plansHour = this.id;
        plansId = plansHour.charAt(3).toString();
        
        var plansText = $("#text" + plansId).val();
        
        localStorage.setItem(plansId, plansText);
    });
})