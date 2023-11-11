document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();
    let counter = 30; // Initial counter value

    webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data === null) {
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

    // Function to check if the angle of the phone is below 35 degrees and start the counter
    function startCounter() {
        if (counter > 0) {
            counter--;
            document.getElementById("counter").value = counter;
        } else {
            // Counter reached 0, take appropriate action
            console.log("Counter reached 0. Implement your action here.");

            // Check if the browser supports notifications
            if ("Notification" in window) {
                if (Notification.permission === "granted" && counter === 0) {
                    new Notification("Hey, fix your posture");
                } else if (Notification.permission !== 'denied' || Notification.permission === "default") {
                    Notification.requestPermission(function (permission) {
                        if (permission === "granted" && counter === 0) {
                            new Notification("Hey, fix your posture");
                        }
                    });
                }
            }
        }
    }

    // Function to reset the counter to its initial value
    function resetCounter() {
        counter = 30;
        document.getElementById("counter").value = counter;
    }
});
