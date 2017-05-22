/**************************************************************************************************************************************************************
Portfolio Part A – Validation using jQuery
Author: Diego Rivera
17/03/2017
***************************************************************************************************************************************************************/

$(document).ready(function(){
    //initially the fish varieties message box will be hide
    $("#FishComments").hide();

    //to display fish varieties message box
    var hidden = true;
    $("#chkOther").click(function(){
        if(hidden)
        {
            $("#FishComments").show("slow");
            hidden = false;
        }
        else
        {
            hidden = true;
            $("#FishComments").hide("slow");
        }
    });
/*
********************************************************************* Submit Form Functions *********************************************************************
*/
    $("#sendForm").click(function(){
        var msg = "";
        var submitOK = 0;
        var mailFill = false;
        var noComments = false;
        var name = $("#txtName").val();
        var age = $("#numAge").val();
        var email = $("#txtEmail").val();
        email = email.trim();
        var conEmail = $("#txtConEmail").val();
        var comments = $("#txtComments").val();
        
        //name validation
        if(name.length >= 5)
        {
            if(/([A-Za-z]+)/.test(name) == true && /([0-9-]+)/.test(name) == false)
            {
                submitOK += 1;
                msg += "Thanks <strong>" + name + "</strong> for registering!";
                $("#errorName").html("");
            }
            else
            {
                $("#errorName").html("*You must enter only vowels and/or consonants for your name. Please try again!");
            }
        }
        else if (name.length < 5 && name.length >= 1)
        {
            $("#errorName").html("*Sorry, your name must have at least 5 characters for your name. Please try again!");
        }
        else
        {
            $("#errorName").html("*You must enter your name!");
        }

        //age validation
        if(age.length > 0)
        {
            if(/([A-Za-z]+)/.test(age) == false && /([0-9-]+)/.test(age) == true)
                if(age >= 5 && age < 100)
                {
                    submitOK += 1;
                    msg += "<br />You are <strong>" + age + "</strong> years old!. Old enough to recieve our newsletter.";
                    $("#errorAge").html("");
                }
                else if(age < 0)
                {
                    $("#errorAge").html("*Please check your age entered, must be an Error!!!");
                }
                else if(age <= 4 && age >= 0)
                {
                    $("#errorAge").html("*Wow your are a Genius!!!, but we will need the agreement of your parents");
                }
                else if(age >= 100)
                {
                    $("#errorAge").html("*Wow!!! Are you still alive?...Awesome!!! but we will need the agreement of someone in charge of you, Sorry the inconvenient.");
                }
            else
            {
                $("#errorAge").html("*Please enter your Age, only numbers are allowed: E.g. 30!");
            }
        }
        else
        {
            $("#errorAge").html("*You must enter your age to validate your submition. Please try again!");
        }

        //including sex selection to the message
        if($("#radFemale").is(":checked"))
            msg += "<br>Your gender is: <strong>" + $("#radFemale").val() + "</strong>";
        else
            msg += "<br>Your gender is: <strong>" + $("#radMale").val() + "</strong>";


        //e-mail validation
        if(email.length > 0)
        {
            if(/(\w+@[a-zA-Z_]+?\.[a-zA-Z_]{2,6})/.test(email) == true)
            {
                submitOK += 1;
                mailFill = true;
                msg += "<br />We will send you a confirmation e-Mail to: <strong>" + email + "</strong>";
                $("#errorEmail").html("");
            }
            else
            {
                $("#errorEmail").html("*e-MAil not valid (youremail@example.com). Please try again!");
            }
        }  
        else
        {
            $("#errorEmail").html("*You must enter your e-Mail!.");
        }

        //e-mail confirmation
        if(mailFill)
        {
            if(email === conEmail)
            {
                submitOK += 1;
                $("#errorConEmail").html("");
            }
            else
            {
                $("#errorConEmail").html("*e-Mail doesn't match, please try again!.");
            }
        }

        //interested varieties validation
        msg += "<br />You are interested in the following varieties:";

        if($("#chkMyVarieties input[type=checkbox]").is(":checked"))
        {
            submitOK += 1;
            $("input[type=checkbox]:checked").each(function(){
                msg += " <strong>" + $(this).prop('value') + ", </strong>";
                $("#errorVarieties").html("");
            });
        
            //Fish varieties comments validation
            if($("#chkOther").is(":checked"))
            {
                if(comments.length >= 10)
                {
                    submitOK += 1;
                    msg += "<br /><strong>Other Comments: </strong>" + comments;
                    $("#errorComments").html("");
                }
                else if(comments.length < 10 && comments.length > 0)
                {
                    $("#errorComments").html("*Please enter a longer comment about your fish interests. Try again!.");
                }
                else
                {
                    $("#errorComments").html("*Please enter any comment about your fish interest. Try again!.");
                }
            }
            //to display confirmation without Comments
            else
            {
                noComments = true; 
            }
        }
        else
        {
            $("#errorVarieties").html("*Please select at least one fish interest. Try again!.");
        }

        //inlcuding the selection value to the message
        msg += "<br />You heard about us from the: <strong>" + $("#selAboutus").val() + "</strong>";

        if(submitOK == 6)
        {
            $(location).attr('href', '#mySummary');
            //window.location.href = "#mySummary";
            $("#ans").html(msg);
            document.getElementById('myForm').reset();
            $("#FishComments").hide();
            hidden = true;
        }
        else if(submitOK == 5 && noComments == true)
        {
            $(location).attr('href', '#mySummary');
            //window.location.href = "#mySummary";
            $("#ans").html(msg);
            document.getElementById('myForm').reset();
            $("#FishComments").hide();
            hidden = true;
        }
            
    });
/*
********************************************************************* Clear Form Functions *********************************************************************
*/
    $("#clearForm").click(function(){
        //clear all error messages
        $("#errorName").html("");
        $("#errorAge").html("");
        $("#errorEmail").html("");
        $("#errorConEmail").html("");
        $("#errorVarieties").html("");
        $("#errorComments").html("");

        //to clear values from name, email and confirm email
        $("input[type=text]").each(function(){
                $(this).val("");
        });

        //clean age, type=number
        $("#numAge").val("");

        //clear gender radiobutton
        $("input[type='radio']").prop('checked', false).checkboxradio('refresh');
        $("#radFemale").prop('checked', true).checkboxradio('refresh');
        
        //clear varieties checkbox
        $("input[type='checkbox']").prop('checked',false).checkboxradio('refresh');

        //clear comments
        $("#txtComments").val("");

        //ensure no comments box without other checked option
        $("#FishComments").hide();
        hidden = true;

        //multi select box for favourite days
        $("#selAboutus option:selected").each(function(){
            $(this).removeProp("selected");
        });
        $("#selAboutus").prop("selectedIndex", 0);
        $("#selAboutus").selectmenu("refresh", true);

        $("#ans").html("");
        $("#txtName").focus();
    });

});