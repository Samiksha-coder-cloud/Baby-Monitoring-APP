alarm = "";
objects = "";
status1 = "";

function preload() {

    alarm = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(400, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting Object";
}

function modelLoaded( ) {
    console.log("model is loaded");
    status1 = true;
}

function draw() {
    image(video, 0, 0, 400, 380);

    if (objects == "person") {

        objectDetector.detect(video, gotResult);

        for (i = 0; i < results[i].label; i++) {

            document.getElementById("Status").innerHTML = "Status: Objects Detected";
            document.getElementById("object").innerHTML = "Baby Not Found";

            alarm.play();
            
            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + " % ", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);

        objects = results;
    }
}