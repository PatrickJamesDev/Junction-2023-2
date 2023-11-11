document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();

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
});