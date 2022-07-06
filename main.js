difference = 0;
noseX=0;
noseY=0;

  function setup() {
  canvas = createCanvas(550, 550);
  canvas.position(690,150);
  if(windowWidth <= 800){
     video = createCapture(VIDEO);
      video.position(180,400);
        video.size(300,300)
    }else{
      video = createCapture(VIDEO);
      video.position(50,400);
      video.size(500,400)
    }

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Model Loaded!');
}


function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    noseX = floor(results[0].pose.nose.x);
    noseY = floor(results[0].pose.nose.y);
    console.log("noseX = " + noseX +" noseY = " + noseY);

    rightWristX = floor(results[0].pose.rightWrist.x);
    leftWristX = floor(results[0].pose.leftWrist.x);
    difference = leftWristX - rightWristX;

    console.log("rightWristX = " + rightWristX + " leftWristX = "+leftWristX + " difference = " + difference);
  }
}

function draw() {
background('#969A97');

  document.getElementById("rect_width").innerHTML = "Width And Height of Rectangle will be = " + difference +"px";
  fill('#F90093');
  stroke('#F90093');

  rect(noseX, noseY, difference, difference);
}