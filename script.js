document.addEventListener('DOMContentLoaded', function () {
    const rotation = new Rotation();
    let isFaceInFrame = false; // Flag to track whether the face is in frame

    webgazer.setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (data == null) {
                return;
            }

            const faceModel = data.face; // Access face model data
            const webgazerFrame = document.getElementById("webgazer-video").getBoundingClientRect();

            // Check if the face is in frame based on webgazer frame color
            isFaceInFrame = isFaceInWebgazerFrame(faceModel, webgazerFrame);

            const phoneAngle = rotation.getRotation(); // Get the angle of the phone
            document.getElementById("rotation").value = phoneAngle.toFixed(2);

            // Update "Face in frame" text box with 1 if face is in frame, otherwise 0
            document.getElementById("faceInFrame").value = isFaceInFrame ? 1 : 0;

            // Check if the phone angle is below 35 degrees and the face is in frame
            if (phoneAngle < 35 && isFaceInFrame) {
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
    }, 1); // Update every 0.01 second, adjust as needed

    // Function to check if the face is in the webgazer frame based on color
    function isFaceInWebgazerFrame(faceModel, webgazerFrame) {
        // Assuming green color indicates the face is in frame
        // You may need to adjust the color values based on your setup
        const pixelColor = getPixelColorAtCenter(webgazerFrame);

        // Check if the pixel color is green
        return pixelColor[0] < 50 && pixelColor[1] > 150 && pixelColor[2] < 50;
    }

    // Function to get the color of the pixel at the center of the webgazer frame
    function getPixelColorAtCenter(webgazerFrame) {
        const canvas = document.getElementById('webgazer-video');
        const context = canvas.getContext('2d');

        const centerX = Math.floor(webgazerFrame.left + webgazerFrame.width / 2);
        const centerY = Math.floor(webgazerFrame.top + webgazerFrame.height / 2);

        const pixel = context.getImageData(centerX, centerY, 1, 1).data;

        return pixel;
    }

    // Function to start the counter countdown
    function startCounter() {
        // Implement your counter logic here
        console.log("Face in frame, start counter!");
    }

    // Function to reset the counter to its initial value
    function resetCounter() {
        // Implement your counter reset logic here
        console.log("Counter reset!");
    }
});
