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
        var row = $("<form>").addClass("row").attr("id", i);
        timeblocks.append(row);

        // Create and style hour of day column
        var col1 = $("<div>").addClass("col-sm-1").text(hourDisplay + ampm).css({
            "text-align": "right",
            "padding-right": "10px",
            "padding-top": "10px",
            "border-top": "1px solid black",
            "border-right": "1px solid black"
        });
        $("#" + i).append(col1);

        // Create and style text input column
        var col2 = $("<textarea>").addClass("col-sm-10").attr("id", "text" + i).css("border", 0);
        $("#" + i).append(col2);

        // Set text content of text area to stored value
        var planTextDisplay = localStorage.getItem(i);
        if (planTextDisplay != null) {
            console.log(planTextDisplay);
            $("#text" + i).val(planTextDisplay);
        }

        // Set background color of text area based on time
        if (hour == time) {
            col2.attr("style", "background-color: #ff2400");
        }
        if (hour < time) {
            col2.attr("style", "background-color: silver");
        }
        if (hour > time) {
            col2.attr("style", "background-color: #7cfc00");
        }

        // Create and style save button
        var col3 = $("<button>").addClass("col-sm-1").attr({"id": "btn" + i, "aria-label": "Save"}).css({
            "padding-right": 0,
            "padding-left": 0,
            "border-top-right-radius": "15px",
            "border-bottom-right-radius": "15px",
            "border": 0,
            "border-left": "1px solid black",
            "background-color": "#0FB7C9"
        });
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