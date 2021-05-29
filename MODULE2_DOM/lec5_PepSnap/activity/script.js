

//yeh getusermedia mujhe camera ki access dega -yeh poori line ek promisified function hai

let videoPlayer=document.querySelector("video");
let recordButton=document.querySelector("#record-video");
let photoButton=document.querySelector("#capture-photo");
let recordingstate=false;
let constraints={video:true};
let recordedData;
let mediaRecorder;

(async function()
{
        let Mediastream=await navigator.mediaDevices.getUserMedia(constraints);
        videoPlayer.srcObject=Mediastream;
        mediaRecorder=new MediaRecorder(Mediastream);
       
    
        //so we have attached functions to all these events
        mediaRecorder.onstop=function(e){
             
            console.log("inside on stop");
            console.log(e);
        };
        mediaRecorder.onstart=function(e)
        {
            console.log("inside on start");
            console.log(e);
        };
        mediaRecorder.ondataavailable=function(e)
        {
            console.log("inside on data available");
            console.log(e.data);

           recordedData=e.data;
           saveVideoToFs();
        };
     
        console.log(mediaRecorder);
        //attach clickevent to recordbutton
        recordButton.addEventListener("click", function () {
            if (recordingstate) {
              // stop the recording
              mediaRecorder.stop();
              recordButton.innerHTML="Record";
            } else {
              //start the recording
              mediaRecorder.start();
              recordButton.innerHTML="Recording";

            
            }
            recordingstate= !recordingstate;
          });

    
   
    
})();


function saveVideoToFs() {
  console.log("Saving Video");
  // file object in recordedData
  let videoUrl = URL.createObjectURL(recordedData); // convert Blob object into Blob Url
  console.log(videoUrl);

  let aTag = document.createElement("a");
  aTag.download = "video.mp4";
  aTag.href = videoUrl;

  console.log(aTag);
  aTag.click(); // download start for video
}

