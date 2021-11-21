'use babel';
var fs = require('fs');

class VideoPlayerElement extends HTMLElement {
  createdCallback() {
	  this.attachShadow({ mode: 'open' });
    //this.create_videoElement();
  }

  show_video_controls(){
    document.getElementById("play_pause").style.display="inline-block";
    document.getElementById("stop").style.display="inline-block";
    document.getElementById("next_video").style.display="inline-block";
    document.getElementById("toggle_random").style.display="inline-block";
    document.getElementById("toggle_loop").style.display="inline-block";
    document.getElementById("toggle_sound").style.display="inline-block";
    document.getElementById("toggle_autopause").style.display="inline-block";
  }

  hide_video_controls(){
    document.getElementById("play_pause").style.display="none";
    document.getElementById("stop").style.display="none";
    document.getElementById("next_video").style.display="none";
    document.getElementById("toggle_random").style.display="none";
    document.getElementById("toggle_loop").style.display="none";
    document.getElementById("toggle_sound").style.display="none";
    document.getElementById("toggle_autopause").style.display="none";
  }

  toggle_auto_change_image(){
    if(button_auto_change_image.classList.contains('status-added')){
      button_auto_change_image.classList.remove('status-added');
    }
    else{
      button_auto_change_image.classList.add('status-added');
      button_random_video.classList.remove('status-added');
      button_random_video2.classList.remove('status-added');
      button_random_video_loop.classList.remove('status-added');
      button_random_video_loop2.classList.remove('status-added');
      //If no RI green, green the RI
      if(!button_random_image.classList.contains('status-added') && !button_random_image2.classList.contains('status-added')){
        //IF no current PATH selected, use RI (From a video to random images)
        button_random_image.classList.add('status-added');
        this.open_random_images(atom.config.get('background-video-player.RI_path'));
      }
      else{
        //Use current used path (simple toggle on/off, same PATH)
        this.open_random_images(document.getElementById('current_random_images_path').innerHTML);
      }
    }
  }

  create_videoElement() {
    //Create custom control bar
    var custom_controls = document.createElement('div');
    custom_controls.innerHTML = '<div id="custom_controls" style="border:1px solid black;position: absolute;width: 100%;bottom: 0;left: 0;background-color:#888;z-index:9999;"><div style="background-color: #888;width: 100%;height: 5px;z-index:999" class="custom_video_bar_wrap"><div class="custom_video_bar" style="position: absolute;background: #444;height: 5px;transition:0.2s;"></div></div></div>';
    this.shadowRoot.appendChild(custom_controls.firstChild);
    //Create <video> element
    this.videoElement = document.createElement('video');
    this.videoElement.setAttribute('autoplay', true);
    this.videoElement.setAttribute('title', "random");
    this.videoElement.setAttribute('muted','false'); //Sound by default
    //~ this.videoElement.style.minWidth = "100%";
    //~ this.videoElement.style.minHeight = "100%";
    this.videoElement.style.width = "100%";
    this.videoElement.style.height = "auto";
    this.videoElement.id = "background-video-player";
    this.shadowRoot.appendChild(this.videoElement);
    //REDISPLAY VIDEO CONTROLS
    this.show_video_controls();
  }

  stop() {
    //Delete the old videos from the DOM if they exist
    document.querySelectorAll('.video_file').forEach(e => e.remove()); //???
    if(document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#background-video-player")) document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#background-video-player").remove();
    // document.getElementById("background-video-player").remove();
    //Delete old custom_controls (progress bar)
    if(document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#custom_controls")) document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#custom_controls").remove();
    PAUSED_AUTO=0;
    //HIDE SOME VIDEO CONTROLS
    this.hide_video_controls();
  }

  autostart(file){
    this.create_videoElement();
    console.log("AUTOSTART VIDEO : "+file);
    background_video_player=document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#background-video-player");
    background_video_player.setAttribute('src', file);
    background_video_player.loop=true;
    document.getElementById('toggle_loop').classList.remove("status-removed");
  }

  default_image(file){
    backgroundImage=document.querySelectorAll(".item-views")[1];
    clean_path_image=String(file).replace(/'/g,"\\'");
    console.log(clean_path_image);
    backgroundImage.style.backgroundImage="url('"+clean_path_image+"')";
    backgroundImage.style.backgroundSize="cover";
  }

  open_images(files) {
    this.stop();
    backgroundImage=document.querySelectorAll(".item-views")[1];
    clean_path_image=String(files).replace(/'/g,"\\'"); //.replace(/#/g,"\\#") //# USED TO REFERENCE IMAGE... CANNOT ESCAPE IT ???
    console.log(clean_path_image);
    backgroundImage.style.backgroundImage="url('"+clean_path_image+"')";
    backgroundImage.style.backgroundSize="cover";
    button_auto_change_image.classList.remove('status-added');
    button_random_image.classList.remove('status-added');
    button_random_image2.classList.remove('status-added');
    button_random_video.classList.remove('status-added');
    button_random_video2.classList.remove('status-added');
    button_random_video_loop.classList.remove('status-added');
    button_random_video_loop2.classList.remove('status-added');
  }

  create_CHECK_FOCUS(){
    if(window.CHECK_FOCUS) clearInterval(CHECK_FOCUS);
    CHECK_FOCUS = setInterval(function(){
      VIDEO=document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#background-video-player");
      if(VIDEO){
        if (document.hasFocus()) {
          console.log("HAS FOCUS");
          if(PAUSED_AUTO==1 && VIDEO.paused){
            console.log("PAUSED_AUTO=0;");
            PAUSED_AUTO=0;
            VIDEO.play();
          }
        }
        else{
          console.log("NOT HAVE FOCUS");
          if(PAUSED_AUTO==0 && !VIDEO.paused){
            console.log("PAUSED_AUTO=1;");
            PAUSED_AUTO=1;
            VIDEO.pause();
          }
        }
      }
      //console.log("test focus");
    }, 2000);
  }

  set_progress_bar(){
    var bar = document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector(".custom_video_bar");
    var custom_controls_bar = document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#custom_controls");

    background_video_player.addEventListener("timeupdate", function() {
      var time = background_video_player.currentTime / background_video_player.duration;
      bar.style.width = time * 100 + "%";
    });

    custom_controls_bar.addEventListener('click', function(e){
      //console.log("e.offsetX = " + e.offsetX);
      //console.log("custom_controls_bar.offsetWidth = " + custom_controls_bar.offsetWidth);
      const newTime = e.offsetX/custom_controls_bar.offsetWidth;
      //console.log("newTime = "+newTime);
      //console.log("bar.style.width = "+bar.style.width);
      bar.style.width = `${newTime*100}%`; //0.5 => 50%
      //console.log("bar.style.width = "+bar.style.width);
      background_video_player.currentTime = newTime*background_video_player.duration; //Go half way
    });
  }

  set_colors_for_RV(){
    //RANDOM = GREEN
    button_random.classList.remove("status-removed");
    button_random.classList.add("status-added");
    //AUTOPAUSE = RED
    button_autopause.classList.add("status-removed");
    button_autopause.classList.remove("status-added");
    //LOOP = RED
    button_loop.classList.add("status-removed");
    button_loop.classList.remove("status-added");
    //SOUND = GREEN
    button_sound.classList.remove("status-removed");
    button_sound.classList.add("status-added");
  }

  set_colors_for_RVL(){
    //RANDOM = GREEN
    button_random.classList.remove("status-removed");
    button_random.classList.add("status-added");
    //AUTOPAUSE = GREEN
    button_autopause.classList.remove("status-removed");
    button_autopause.classList.add("status-added");
    //LOOP = GREEN
    button_loop.classList.remove("status-removed");
    button_loop.classList.add("status-added");
    //SOUND = RED
    button_sound.classList.add("status-removed");
    button_sound.classList.remove("status-added");
  }

  open_random_videos(FILE_USER_VIDEOS, LOOP=0) { //LOOP = 1 is RVL, 0 is RV
    // button_loop.classList.add('status-added');
    // if (typeof FILE_USER_VIDEOS === 'undefined'){ //??? avoid undefined... ??? only the default ???
    //   if(LOOP){
    //     FILE_USER_VIDEOS=atom.config.get('background-video-player.RVL_path');
    //     this.set_colors_for_RVL();
    //   }
    //   else{
    //     FILE_USER_VIDEOS=atom.config.get('background-video-player.RV_path');
    //     this.set_colors_for_RV();
    //   }
    // }
    document.getElementById('current_video_folder').innerHTML=FILE_USER_VIDEOS;
    this.stop();
    this.create_videoElement();
    background_video_player=document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#background-video-player");

    // Do not display progress bar in RVL
    if(LOOP){ //RVL
      this.set_colors_for_RVL();
      background_video_player.muted=true;
      background_video_player.loop=true;
      this.create_CHECK_FOCUS(); //AUTOPAUSE
    }
    else{ //RV
      this.set_progress_bar();
      this.set_colors_for_RV();
      background_video_player.muted=false;
      background_video_player.loop=false;
      if(window.CHECK_FOCUS) clearInterval(CHECK_FOCUS); //REMOVE AUTOPAUSE IF EXISTS
    }

    var videos = [];
    console.log("open_random_videos().....");
    if (fs.existsSync(FILE_USER_VIDEOS)) {
      console.log("EXISTS "+FILE_USER_VIDEOS);
      fs.readdir(FILE_USER_VIDEOS, function (erro, folders) {
        for (const folder of folders) {
          //If folder is an image, just push the image
          if(folder.indexOf(".mkv")>-1 || folder.indexOf(".mp4")>-1 || folder.indexOf(".webm")>-1){
            console.log("Add video : "+folder);
            videos.push(folder);
          }
          else{
            console.log("Check folder : "+folder);
            fs.readdir(FILE_USER_VIDEOS+folder, function (err, files) {
              for (const file of files) videos.push(folder+"/"+file);
            });
          }
        }
      });
      //Delay to give time for videos ARRAY to be populated
      setTimeout(function(){
        console.log("nb of videos : "+videos.length);
        var RnD=Math.random();
        console.log("RnD = " + RnD);
        RND_VID=videos[Math.floor(RnD * videos.length)];
        clean_path_video=FILE_USER_VIDEOS+String(RND_VID); //.replace(/'/g,"\\'")
        console.log(clean_path_video);
        background_video_player.setAttribute('src', clean_path_video);
      }, 200);

      //Create addeventlistener if video is over and loop is off, trigger open_random_videos() again :)
      background_video_player.addEventListener('ended', () => {
        if(!this.videoElement.loop){
          if(LOOP) this.open_random_videos(FILE_USER_VIDEOS,1);
          else this.open_random_videos(FILE_USER_VIDEOS);
        }
      });
    }
    else{
      console.log("NOT EXISTS "+FILE_USER_VIDEOS);
    }
  }

  async open_random_images(FILE_USER_IMAGES,WAIT=0) { //Wait x ms before changing wallpaper
    if(document.getElementById('current_random_images_path').innerHTML!=FILE_USER_IMAGES){
      //Update value
      document.getElementById('current_random_images_path').innerHTML=FILE_USER_IMAGES;
    }
    if(WAIT!=0){
      if(document.getElementById('run_change_wallpaper_only_once').innerHTML=="1"){
        console.log("exit open_random_images, WAIT only 1 time...");
        return 0; //exit open_random_images
      }
      document.getElementById('run_change_wallpaper_only_once').innerHTML="1";
      console.log("Wait "+WAIT+"ms...");
      await new Promise(resolve => setTimeout(() => resolve(true), WAIT))
        .then((result) => {
          //back to 0 after the waiting period
          document.getElementById('run_change_wallpaper_only_once').innerHTML="0";
        });
      if(!button_auto_change_image.classList.contains('status-added')){
        console.log("button_auto_change_image DOES NOT CONTAINS status-added EXIT");
        return 0;
      }
      console.log("button_auto_change_image DOES CONTAINS status-added CONTINUE");
    }
    this.stop();
    var images = [];
    console.log("open_random_images().....");
    backgroundImage=document.querySelectorAll(".item-views")[1];
    FILE_USER_IMAGES=document.getElementById('current_random_images_path').innerHTML;
    if (fs.existsSync(FILE_USER_IMAGES)) {
      console.log("EXISTS "+FILE_USER_IMAGES);
      fs.readdir(FILE_USER_IMAGES, function (erro, folders) {
      	for (const folder of folders) {
      	  //If folder is an image, just push the image
          if(folder.indexOf(".jpeg")>-1 || folder.indexOf(".jpg")>-1 || folder.indexOf(".png")>-1){
            // console.log("Add image : "+folder);
            images.push(folder);
          }
          else{
            // console.log("Check folder : "+folder);
            if(fs.lstatSync(FILE_USER_IMAGES+folder).isDirectory()){
              fs.readdir(FILE_USER_IMAGES+folder, function (err, files) {
                for (const file of files) images.push(folder+"/"+file);
              });
            }
          }
        }
      });
      //Delay to give time for images ARRAY to be populated
      setTimeout(function(){
        // console.log("nb of images : "+images.length);
        var RnD=Math.random();
        // console.log("RnD = " + RnD);
        RND_IMG=images[Math.floor(RnD * images.length)];
        clean_path_image=FILE_USER_IMAGES+"/"+String(RND_IMG).replace(/'/g,"\\'");
        console.log(clean_path_image);
        backgroundImage.style.backgroundImage="url('file://"+clean_path_image+"')";
        backgroundImage.style.backgroundSize="cover";
      }, 500);
      if(button_auto_change_image.classList.contains('status-added')){
        this.open_random_images(document.getElementById('current_random_images_path').innerHTML,atom.config.get('background-video-player.seconds_change_wallpaper')+"000");
      }
    }
    else{
      console.log("NOT EXISTS "+FILE_USER_IMAGES);
      new Notification("Random wallpaper change", { body: "Use RI_path by default "+atom.config.get('background-video-player.RI_path') });
      button_random_image.classList.add('status-added');
      button_random_image2.classList.remove('status-added');
      this.open_random_images(atom.config.get('background-video-player.RI_path'));
    }
  }

  open(files) {
    document.getElementById('RV_or_RVL_or_MANUAL').textContent="MANUAL";

    button_auto_change_image.classList.remove('status-added');
    button_random_image.classList.remove('status-added');
    button_random_image2.classList.remove('status-added');
    button_random_video.classList.remove('status-added');
    button_random_video2.classList.remove('status-added');
    button_random_video_loop.classList.remove('status-added');
    button_random_video_loop2.classList.remove('status-added');

    //RANDOM = RED, manually opened : not random...
    button_random.classList.add("status-removed");
    button_random.classList.remove("status-added");
    //AUTOPAUSE = RED
    button_autopause.classList.add("status-removed");
    button_autopause.classList.remove("status-added");
    //LOOP = RED
    button_loop.classList.add("status-removed");
    button_loop.classList.remove("status-added");
    //MUTE = GREEN
    button_sound.classList.remove("status-removed");
    button_sound.classList.add("status-added");

    number_of_videos=files.length;

    this.stop();

    //Write video path and numbers in the DOM
    //files.forEach(file => {
    for (var i = 0; i < number_of_videos; i++) {
      console.log("file : "+files[i]);
      var fileDiv = document.createElement('div');
      fileDiv.classList.add("video_file");
      if(i==0){
        fileDiv.setAttribute("title", "next_video"); //use title to know which video is next
      }
      fileDiv.setAttribute("id", "video_number_"+i);
      fileDiv.style.cssText = 'display:none;';
      fileDiv.innerText=files[i];
      document.body.appendChild(fileDiv);
    }

    if(this.videoElement) this.videoElement.remove(); //Need to have clean code again to avoid errors
    this.create_videoElement();

    if(number_of_videos!=1){
      this.videoElement.loop=false;
      document.getElementById('toggle_loop').classList.add("status-removed");
    }
    else{
      this.videoElement.loop=true;
      document.getElementById('toggle_loop').classList.remove("status-removed");
    }

    //Set video player ??? A little hacky there... but it works :p (this.videoElement not working everywhere... addevenlistener??)
    background_video_player=document.querySelector("body > atom-workspace > atom-workspace-axis > atom-workspace-axis > atom-pane-container > atom-pane > div > video-player-background").shadowRoot.querySelector("video-player").shadowRoot.querySelector("#background-video-player");

    //LOGS
    // console.log("background_video_player.loop = " + background_video_player.loop);
    // console.log("background_video_player.muted = " + background_video_player.muted);
    // console.log("background_video_player.paused = " + background_video_player.paused);

    if(document.querySelector('[title="next_video"]')){
      //take the next video as attribute
      background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText);
    }

    background_video_player.addEventListener('ended', () => { //when video is over, play next video
      // if(background_video_player.getAttribute('title')=="random"){
      if(!button_random.classList.contains("status-removed")){
        do{
          new_random_video_number=Math.floor(Math.random()* number_of_videos);
        } while(document.getElementById('video_number_'+new_random_video_number).getAttribute("title")=="next_video");
        document.querySelector('[title="next_video"]').removeAttribute('title'); //remove next_video
        document.getElementById('video_number_'+ new_random_video_number).setAttribute("title", "next_video"); //add next_video
        background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText); //take the next video as attribute
      }
      else{ // NOT RANDOM
        //Give the next_video to the next video_number_x ID
        new_video_number=parseInt(document.querySelector('[title="next_video"]').id.replace("video_number_", ""))+1; //Check the next video number
        if(number_of_videos>new_video_number){
          document.querySelector('[title="next_video"]').removeAttribute('title'); //remove next_video
          document.getElementById('video_number_'+new_video_number).setAttribute("title", "next_video"); //add next_video
          background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText); //take the next video as attribute
        }
        else{ //Restart with the first video
          document.querySelector('[title="next_video"]').removeAttribute('title'); //remove next_video
          document.getElementById('video_number_0').setAttribute("title", "next_video"); //add next_video
          background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText); //take the next video as attribute
        }
      }
    });

    this.set_progress_bar();
  }

  //Enable / disable text-shadow
  toggle_textshadow() {
    //new Notification("textshadow", { body: "textshadow/background was toggled" });
    var link = document.getElementById("CSS_text_shadow"); //Fetch the link by its ID
    if(link.href.includes("textbackground.css")){
      document.getElementById('toggle_textshadow').classList.remove("status-removed");
      link.href="/home/umen/.atom/packages/background-video-player/switch_styles/textshadow.css";
    }
    else{
      document.getElementById('toggle_textshadow').classList.add("status-removed");
      link.href="/home/umen/.atom/packages/background-video-player/switch_styles/textbackground.css";
    }
  }

  //Enable / disable loop video
  toggle_loop() {
    if(this.videoElement.loop){ //if true
      //NOT ALLOW TO DISABLE LOOP IF ONLY ONE FILE IS OPENED
      if(!document.getElementById('video_number_1') && document.getElementById('RV_or_RVL_or_MANUAL').textContent=="MANUAL"){ //LESS THAN 2 VIDEOS
        new Notification("Loop", { body: "You selected only 1 video, loop cannot be disabled" });
      }
      else{ //AT LEAST 2 VIDEOS (RV and RVL will always go here)
        //RVL is always a loop (duh)
        if(document.getElementById('RV_or_RVL_or_MANUAL').textContent=="RVL"){
          new Notification("Loop", { body: "RVL is always a loop..." });
        }
        else{
          this.videoElement.loop=false;
          document.getElementById('toggle_loop').classList.add("status-removed");
          document.getElementById('toggle_loop').classList.remove("status-added");
          //new Notification("Loop", { body: "loop was disabled" });
        }
      }
    }
    else{
      this.videoElement.loop=true;
      document.getElementById('toggle_loop').classList.remove("status-removed");
      document.getElementById('toggle_loop').classList.add("status-added");
      //new Notification("Loop", { body: "loop was enabled" });
    }
  }

  //Enable / disable random video
  toggle_random() {
    //Can change random only if not RV or RVL (duh)
    if(document.getElementById('RV_or_RVL_or_MANUAL').textContent=="MANUAL"){
      if(button_random.classList.contains('status-removed')){
        document.getElementById('toggle_random').classList.remove("status-removed");
        document.getElementById('toggle_random').classList.add("status-added");
        //new Notification("Loop", { body: "Ramdom was enabled" });
      }
      else{
        document.getElementById('toggle_random').classList.add("status-removed");
        document.getElementById('toggle_random').classList.remove("status-added");
        //new Notification("Loop", { body: "Random was disabled" });
      }
    }
    else{
      new Notification("Random", { body: "RV and RVL are always random..." });
    }
  }

  //Enable / disable video sound
  toggle_sound() {
    if(this.videoElement.muted){  //if true
      this.videoElement.muted=false;
      document.getElementById('toggle_sound').classList.remove("status-removed");
      document.getElementById('toggle_sound').classList.add("status-added");
      //new Notification("muted", { body: "Sound was enabled" });
    }
    else{
      this.videoElement.muted=true;
      document.getElementById('toggle_sound').classList.add("status-removed");
      document.getElementById('toggle_sound').classList.remove("status-added");
      //new Notification("muted", { body: "Sound was muted" });
    }
  }

  // toggleControl() {
  //   if (this.isControlVisible()) {
  //     this.hideControl();
  //   } else {
  //     this.showControl();
  //   }
  // }
  // isControlVisible() {
  //   return !!this.videoElement.getAttribute('controls');
  // }
  // showControl() {
  //   this.videoElement.setAttribute('controls', true);
  // }
  // hideControl() {
  //   this.videoElement.removeAttribute('controls');
  // }

  play_pause(){
    console.log('play_pause');
    if(this.videoElement.paused){
      this.videoElement.play();
      document.getElementById('play_pause').textContent="⏸";
    }
    else{
      this.videoElement.pause();
      document.getElementById('play_pause').textContent="▶";
    }
  }

  toggle_autopause(){
    if(window.CHECK_FOCUS){
      document.getElementById('toggle_autopause').classList.add("status-removed");
      document.getElementById('toggle_autopause').classList.remove("status-added");
      //new Notification("autopause", { body: "Autopause is disabled" });
      clearInterval(CHECK_FOCUS);
    }
    else{
      document.getElementById('toggle_autopause').classList.remove("status-removed");
      document.getElementById('toggle_autopause').classList.add("status-added");
      //new Notification("autopause", { body: "Autopause is enabled" });
      //Pause / unpause automatically if window not focused
      PAUSED_AUTO=0 //I THINK NEED TO PUT HERE RIGHT ???
      if(window.CHECK_FOCUS) create_CHECK_FOCUS();
    }
  }


  next_video(){
    if(document.getElementById('RV_or_RVL_or_MANUAL').textContent=="RVL"){
      this.open_random_videos(document.getElementById('current_video_folder').innerHTML,1);
    }
    else if(document.getElementById('RV_or_RVL_or_MANUAL').textContent=="RV"){
      this.open_random_videos(document.getElementById('current_video_folder').innerHTML);
    }
    else{ //MANUAL OPENING
      //Need minimum 2 videos to go next video, otherwise trigger random ? :)
      if(document.getElementById('video_number_1')){ //IT means 0 and 1 exists... :D
        if(!button_random.classList.contains("status-removed")){
          console.log("NEXT VIDEO IS RANDOM !!!!");
          do{
            new_random_video_number=Math.floor(Math.random()* number_of_videos);
          } while(document.getElementById('video_number_'+new_random_video_number).getAttribute("title")=="next_video");
          document.querySelector('[title="next_video"]').removeAttribute('title'); //remove next_video
          document.getElementById('video_number_'+ new_random_video_number).setAttribute("title", "next_video"); //add next_video
          background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText); //take the next video as attribute
        }
        else{ // NOT RANDOM
          //Give the next_video to the next video_number_x ID
          new_video_number=parseInt(document.querySelector('[title="next_video"]').id.replace("video_number_", ""))+1; //Check the next video number
          if(number_of_videos>new_video_number){
            document.querySelector('[title="next_video"]').removeAttribute('title'); //remove next_video
            document.getElementById('video_number_'+new_video_number).setAttribute("title", "next_video"); //add next_video
            background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText); //take the next video as attribute
          }
          else{ //Restart with the first video
            document.querySelector('[title="next_video"]').removeAttribute('title'); //remove next_video
            document.getElementById('video_number_0').setAttribute("title", "next_video"); //add next_video
            background_video_player.setAttribute('src', document.querySelector('[title="next_video"]').innerText); //take the next video as attribute
          }
        }
      }
    } //END MANUAL OPENING (else)
  }

};

module.exports = document.registerElement('video-player', {
  prototype: VideoPlayerElement.prototype
});
