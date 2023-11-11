document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();

    webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            const phoneAngle = rotation.getRotation(); // Get the angle of the phone
            document.getElementById("rotation").value = phoneAngle.toFixed(2);
        })
        .begin();
    webgazer.showPredictionPoints(true);

    //if face is frame, faceInFrame = true, else faceInFrame = false
    const faceInFrame = webgazer.getTracker().getIsTracking();

    setInterval(() => {
        const phoneRotation = rotation.getRotation();
        if (phoneRotation > 10) {
            document.getElementById("exercise").style.display = "block";
        } else {
            document.getElementById("exercise").style.display = "none";
        }
    }, 10); // Update every 0.01 second, adjust as needed
});