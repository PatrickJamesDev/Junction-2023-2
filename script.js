document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();
    let counter = 30; // Initial counter value
    let countdownInterval; // Variable to hold the countdown interval

    webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data == null) {
                return;
            }

            const faceModel = data.face; // Access face model data
            if (faceModel) {
                const faceAngle = faceModel.angle; // Get the angle of the face
                document.getElementById("face-angle").value = faceAngle.toFixed(2);

                // Check if the face tracking model has points
                if (faceModel.points) {
                    // Access face tracking points (vertices)
                    const facePoints = faceModel.points;
                    console.log("Face Points:", facePoints);
                }
            }

            const phoneAngle = rotation.getRotation(); // Get the angle of the phone
            document.getElementById("rotation").value = phoneAngle.toFixed(2);

            // Check if the phone angle is below 35 degrees
            if (phoneAngle < 35) {
                startCounter();
            } else {
                resetCounter();
            }
        })
        .begin();
    webgazer.showPredictionPoints(true);

    setInterval(() => {
        const phoneRotation = rotation.getRotation();
        if (phoneRotation > 10) {
            document.getElementById("exercise").style.display = "block";
        } else {
            document.getElementById("exercise").style.display = "none";
        }
    }, 10); // Update every 0.01 second, adjust as needed

    // Function to start the counter countdown
    function startCounter() {
        if (!countdownInterval) {
            countdownInterval = setInterval(() => {
                if (counter > 0) {
                    counter--;
                    document.getElementById("counter").value = counter;
                } else {
                    // Counter reached 0, take appropriate action
                    console.log("Counter reached 0. Implement your action here.");
                    // Send notification to browser "Hey fix your posture"
                    // Check if the browser supports notifications
                    if ('Notification' in window) {
                        Notification.requestPermission().then(function(permission) {
                            if (permission === 'granted') {
                                new Notification("Hey fix your posture");
                            }
                        });
                    }
                    clearInterval(countdownInterval); // Stop the countdown
                    countdownInterval = null; // Reset the interval variable
                }
            }, 1000); // Update every 1 second
        }
    }

    // Function to reset the counter to its initial value
    function resetCounter() {
        clearInterval(countdownInterval); // Stop the countdown if running
        countdownInterval = null; // Reset the interval variable
        counter = 30;
        document.getElementById("counter").value = counter;
    }
});
