$(document).ready(function(){
console.log("javascript linked")

//global variables
    var database = firebase.database();
    var currentTime = moment().format("HH:mm:ss")
    var timerInt

    $("#time-display").text(currentTime)
    
//functions to dynamically display current time
    function runTime() {
        clearInterval(timerInt);
        timerInt = setInterval(displayTime, 1000);
      }
    
    function displayTime(){
        currentTime = moment().format("HH:mm:ss")
        $("#time-display").text(currentTime)
    }

    runTime();
    

//on click event for submit button
    $("#sub-button").on("click", function(event){
        event.preventDefault();

        //grab inputs from text boxes
            var trainName = $("#name").val().trim();
            var destination = $("#destination").val().trim();
            var firstTime = $("#first-time").val().trim();
            var frequency = $("#frequency").val().trim();

        //push values to firebase 
            database.ref().push({
                TrainName: trainName,
                Destination: destination,
                FirstTime: firstTime,
                Frequency: frequency
            })

        
        //pull the values back into the table
        $("#table-body").empty()
        
        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
            //creates a new row with data whenever there is a new child in the firebase (ie submitted)
            var newRow = $("<tr>")

            var nameData = $("<td>")
            var destData = $("<td>")
            var freqData = $("<td>")
            var naData = $("<td>")
            var maData = $("<td>")
        
        //train math to figure out next arrival and minutes away from First Time and Frequency inputs
        var tFrequency = snapshot.val().Frequency
        var firstTime = snapshot.val().FirstTime
        
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes")
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainConvert = moment(nextTrain).format("HH:mm")

        //setting the text to the corresponding values
            nameData.text(snapshot.val().TrainName)
            destData.text(snapshot.val().Destination)
            freqData.text(snapshot.val().Frequency)
            naData.text(nextTrainConvert)
            maData.text(tMinutesTillTrain)


        //appending the data cells to the newRow
            newRow.append(nameData)
            newRow.append(destData)
            newRow.append(freqData)
            newRow.append(naData)
            newRow.append(maData)

        //appending the new row to the table body
            $("#table-body").append(newRow)

        })//child added close

    })//sub button close

})//document ready close