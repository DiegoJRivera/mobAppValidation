/**************************************************************************************************************************************************************
Portfolio Part A – Validation using Plug-in
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
********************************************************************* Clear Form Functions *********************************************************************
*/
    $("#clearFormPlugIn").click(function(){
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
        $("#ans2").html("");
        //$("#txtName").focus();
    });
/*
********************************************************************* Plug-in Validations *********************************************************************
*/
    $("#contactForm").validate({

        errorContainer:"#errorBox",
        errorLabelContainer:"#errorBox ul",
        wrapper:"li",

        submitHandler: function(){
            var str = "";
            str += "Your name is: " + $("#txtName").val();
            str += "<br />You are: " + $("#numAge").val() + " years old";
            str += "<br />We will send you a confirmation to: " + $("#txtEmail").val();
            if($("#radFemale").is(":checked"))
            str += "<br />Your gender is: <strong>" + $("#radFemale").val() + "</strong>";
            else
            str += "<br />Your gender is: <strong>" + $("#radMale").val() + "</strong>";
            str += "<br />You are interested in the following varieties:";
            if($("#chkMyVarieties input[type=checkbox]").is(":checked"))
            {
                $("input[type=checkbox]:checked").each(function(){
                    str += " <strong>" + $(this).prop('value') + ", </strong>";
                });
            }
            if($("#chkOther").is(":checked"))
            {
                str += "<br /><strong>Other Comments: </strong>" + $("#txtComments").val();
            }
            str += "<br />You heard about us from the: <strong>" + $("#selAboutus").val() + "</strong>";
            $("#ans2").html(str);
            hidden = true;
            $("#FishComments").hide();
            window.location.href = "#mySummaryPlugIn";
            document.getElementById('contactForm').reset();
        },

        showErrors:function(errorMap, errorList){
            
            if(this.numberOfInvalids()>0)
            {
                $("#errorSummary").show();  
                $("#errorSummary").html("Your form contains " + this.numberOfInvalids() + " errors!");
                this.defaultShowErrors();
            }
            else
            {
                $("#errorSummary").hide();
                $("#errorBox").hide();  
            }
        },

        rules: {
            txtName: {
                required: true,
                minlength: 5
            },
            numAge: {
                required: true,
                min: 5,
                max: 120
            },
             txtEmail: {
                required: true,
                email: true
            },
            txtConEmail: {
                required: true,
                equalTo: "#txtEmail"
            },
            chkVarieties:{
                required: true, 
                minlength: 1 
            },
            txtComments:{
                required: "#chkOther",
                minlength: 10 
            },
        },

        messages: {
            txtName: {
                required: "You must enter your name. Please try again!",
                minlength:jQuery.format("Sorry, your name must have at least {0} characters for your name. Please try again!")
            },
            numAge: {
                required: "Please enter your Age, only numbers are allowed.",
                min:jQuery.validator.format("Or you are a Ginius or..must be an error!!!.Please try again!"),
                max:jQuery.validator.format("Wow!!! Are you still alive?...Awesome!!! but try Again! ")
            },
            txtEmail: {
                required: "Enter an e-mail address",
                email: "Enter a valid e-mail address, please try again!."
            },
            txtConEmail: {
                required: "Confirm the e-mail address",
                equalTo:"e-mail doesn't match, please try again!."
            },
            chkVarieties:{
                required: "Please Select at least one Fish varieties.", 
                minlength:jQuery.format("Please Select at least one Fish varieties. Try again!") 
            },
             txtComments:{
                required: "Please enter any comment about your fish interest. Try again!.",
                minlength:jQuery.format("Please enter a longer comment about your fish interests. Try again!") 
            },
           
        }

    });

});