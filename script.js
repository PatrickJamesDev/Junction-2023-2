document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();
    let countdownValue = 30; // Initial countdown value in seconds

    // Load face-api.js models
    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    ]).then(startWebGazer);

    function startWebGazer() {
        webgazer.setRegression('ridge')
            .setTracker('clmtrackr')
            .setGazeListener(function(data, clock) {
                if (data == null) {
                    return;
                }

                trackFaceAngle(data); // Call the function to track face angle

                const phoneAngle = rotation.getRotation(); // Get the angle of the phone
                document.getElementById("rotation").value = phoneAngle.toFixed(2);

                // Check the condition to start the countdown
                if (phoneAngle > 10) {
                    startCountdown();
                } else {
                    resetCountdown();
                }
            })
            .begin();
        webgazer.showPredictionPoints(true);
    }

    // Function to track face angle
    function trackFaceAngle(data) {
        const faceModel = data.face; // Access face model data
        if (faceModel) {
            const faceAngle = faceModel.angle; // Get the angle of the face
            document.getElementById("face-angle").value = faceAngle.toFixed(2);
        }
    }

    // Function to start the countdown
    function startCountdown() {
        if (countdownValue > 0) {
            document.getElementById("countdown").value = countdownValue;
            countdownValue--;
        } else {
            // Execute actions when countdown reaches 0 (e.g., display a message, show exercise)
            document.getElementById("exercise").innerText = "Time's up!";
            // Additional actions can be added here
        }
    }

    // Function to reset the countdown
    function resetCountdown() {
        countdownValue = 30; // Reset countdown value
        document.getElementById("countdown").value = countdownValue;
    }

    setInterval(startCountdown, 1000); // Update countdown every second
});
