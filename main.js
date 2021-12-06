Song1 = "";
Song2 = "";
leftWristx = "";
leftWristy = "";
rightWristx = "";
rightWristy = "";
ScoreRightWrist = 0;
ScoreLeftWrist = 0;
Status_Song1 = "";
Status_Song2 = "";

function setup()
{
    canvas = createCanvas(750,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose",gotPoses);
}

function gotPoses(result)
{
    if(result.length > 0)
    {
       ScoreLeftWrist = result[0].pose.keypoints[9].score;
       ScoreRightWrist = result[0].pose.keypoints[10].score;
       console.log(ScoreLeftWrist+"  "+ScoreRightWrist);

        console.log(result);
        leftWristx = result[0].pose.leftWrist.x;
        leftWristy = result[0].pose.leftWrist.y;
        console.log(leftWristx+"  "+leftWristy);

        rightWristx = result[0].pose.rightWrist.x;
        rightWristy = result[0].pose.rightWrist.y;
        console.log(rightWristx+"  "+rightWristy);
    }
}

function modelLoaded()
{
    console.log("Pose Initialized");
}

function preload()
{
   Song1 = loadSound("music.mp3");
   Song2 = loadSound("music2.mp3");
}

function draw()
{
    image(video,0,0,750,600);

   Status_Song1 = Song1.isPlaying();

   fill("Orange");
   stroke("Red");

   if(ScoreLeftWrist > 0.2)
   {
       circle(leftWristx,leftWristy,3);
       Song2.stop();
       
   if(Status_Song1 == false)
   {
       Song1.play();
       document.getElementById("Song").innerHTML = "Song Name: Harry Potter Theme Song";
   }
   }

   Status_Song2 = Song2.isPlaying();

   if(ScoreRightWrist > 0.2)
   {
       circle(rightWristx,rightWristy,3);
       Song1.stop();
       
   if(Status_Song2 == false)
   {
       Song2.play();
       document.getElementById("Song").innerHTML = "Song Name: Peter Pan";
   }
   }

}

function play()
{
    Song1.play();
}