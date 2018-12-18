$(document).ready(function(){

    console.log("javascript linked")

    var database = firebase.database();

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
            var newRow = $("<tr>")

            var nameData = $("<td>")
            var destData = $("<td>")
            var ftData = $("<td>")
            var freqData = $("<td>")

            nameData.text(snapshot.val().TrainName)
            destData.text(snapshot.val().Destination)
            ftData.text(snapshot.val().FirstTime)
            freqData.text(snapshot.val().Frequency)

            newRow.append(nameData)
            newRow.append(destData)
            newRow.append(ftData)
            newRow.append(freqData)

            $("#table-body").append(newRow)

        })//child added close

    })//sub button close


























})