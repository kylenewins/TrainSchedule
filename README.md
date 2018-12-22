# TrainSchedule

<h1>Markup for the Train Schedule App</h1>

<p>The Train App that I made Is fairly simple. The HTML consists of... </p>

<ul>
    <li>a jumbotron with an active current time display,</li>
    <li>A table that appends with new information that is pulled from firebase</li>
    <li>A Form card at the bottom that takes the data inputs and pushes them to the firebase</li>
</ul>

<p> The javascript for the app is also relatively simple. Descending by line number, (in the .js file) the javascript runs as follows:</p>

<ul>
    <li>Sets global variables for the firebase reference, the format of the currentTime variable, and an empty variable to hold the timerInt</li>
    <li>Sets the time display to the currentTime variable (for the first second before the interval starts)</li>
    <li>The runTime interval that runs the displayTime function once every second</li>
    <li>The displayTime function that grabs and formats the current moment and then displays it to the timeDiplay span in the HTML</li>
    <li>a call to run the interval function</li>
</ul>

<p>The rest of the functionality happens in a click event for the submit button. The first thing that happens is it grabs the input values from the form and stores them in variables. The code then pushes those values to the firebase</p>

<p>After that the code triggers a "reader" for whenever a child is added to the firebase and inside that function several things happen:</p>

<ul>
    <li>A new row with corresponding table data cells are created</li>
    <li>Some math is calculated to obtain the values required by the trains schedule (I pretty much pulled these lines directly from the class example)</li>
    <li>The Text of each of the data cells is written with the corresponding data</li>
    <li>Those Data cells are appended into the row, and that row is appended into the html div</li>
</ul>

<p>That was all I had time to complete unfortunately. I wish I could have figured out how to get the new data entries to append in the page rather than overwriting the first input. Also, if I had a little more time I would have calculated some placeholder trains that would have displayed before the user input train.</p>