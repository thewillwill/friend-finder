//  -------------
// Form Submission 
//  -------------

   
    // Capture the form inputs 
    $("#submit").on("click", function() {

        // Form validation
        function validateForm() {
            var isValid = true;
            $('.form-control').each(function() {
                if ($(this).val() === '')
                    isValid = false;
            });

            $('.chosen-select').each(function() {

                if ($(this).val() === "")
                    isValid = false
            })
            return isValid;
        }

        // If all required fields are filled
        if (validateForm() == true) {
            // Create an object for the user's data


            var scores = [
                $("#q1").val(),
                $("#q2").val(),
                $("#q3").val(),
                $("#q4").val(),
                $("#q5").val(),
                $("#q6").val(),
                $("#q7").val(),
                $("#q8").val(),
                $("#q9").val(),
                $("#q10").val()
            ];

            var newUser = {
                name: $("#name").val().trim(),
                photo: $("#photo").val().trim(),
                scores: scores
            }


            console.log('newUser', newUser);

            // Get the current URL
            var currentURL = window.location.origin;
            // Post new User to the friends API route. 

            $.post("/api/friends", newUser,  function(data) {
              console.log('L225', 'data:', data)

                // get the matching result
                $("#matchName").text(data.name);
                $('#matchImg').attr("src", data.photo);

                // Show the model
                $("#resultsModal").modal('toggle');

            });
        } else {
            alert("You need to fill out all fields to find a match");
        }

        return false;
    });




//  -------------
// User Interface 
//  -------------



// Hide the down arrow on scroll
$(function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 2) {
            $('#arrow').fadeOut();
            $('#navigation').fadeIn();
        } else {
            $('#arrow').fadeIn();
            $('#navigation').fadeOut();

        }
    });
})


//scroll down from top arrow

$("#arrow").click(function() {
    $('html, body').animate({
        scrollTop: $("#instructions").offset().top
    }, 2000);
})


$("#survey-arrow").hover(function() {
    $(this).addClass("animated shake");
});
