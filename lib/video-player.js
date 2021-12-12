'use babel';

let { dialog } = require('electron').remote;
let VideoPlayerElement = require('./video-element');
let VideoPlayerBackgroundElement = require('./background-element');

let videoPlayers = [];
let backgroundVideo = new VideoPlayerBackgroundElement();
videoPlayers.push(backgroundVideo.videoPlayer);

var $ = require('jquery'); //Only for $(document).ready

export default {
  config: {
    underMinimap: {
      title: 'Allow images under minimap',
      type: 'boolean',
      default: true
    },
    css_shadow: {
      title: 'The default css system to use to read text better',
      type: 'string',
      default: 'none.css'
    },
    default_image: {
      title: 'The default image',
      // description: 'Default image to use on start',
      type: 'string',
      default: '/home/umen/SyNc/Projects/HtmlWallpaper/image_created_by_thunar.jpg'
    },
    seconds_change_wallpaper: {
      title: 'Number of seconds before changing wallpaper.',
      // description: 'Images folder',
      type: 'integer',
      default: 60,
      minimum: 10
    },
    number_of_RI: {
      title: 'Number of random images separate folders.',
      type: 'integer',
      default: 3,
      minimum: 1
    },
    RI1_path: {
      title: 'Path to images (Use this folder by default)',
      description: 'Images are selected randomly in this folder : *.png, *.jpg, *.jpeg',
      type: 'string',
      default: '/home/umen/Pictures/GameScript_PopUpLearn/'
    },
    RI2_path: {
      type: 'string',
      default: '/home/umen/Pictures/GameScript_PopUpLearn_/'
    },
    RI3_path: {
      type: 'string',
      default: '/home/umen/SyNc/Projects/HtmlWallpaper/images_created_by_thunar/'
    },
    RI4_path: {
      type: 'string',
      default: '/home/umen/SyNc/Projects/HtmlWallpaper/images_4k_created_by_thunar/'
    },
    RI5_path: {
      type: 'string',
      default: '/home/umen/Pictures/'
    },
    RI6_path: {
      type: 'string',
      default: '/home/umen/Pictures/'
    },
    RI7_path: {
      type: 'string',
      default: '/home/umen/Pictures/'
    },
    RI8_path: {
      type: 'string',
      default: '/home/umen/Pictures/'
    },
    RI9_path: {
      type: 'string',
      default: '/home/umen/Pictures/'
    },
    RV_path: {
      title: 'Path to RV (Random Video FOLDER)',
      description: 'RV : sound enabled, loop disabled, autopause disabled.',
      type: 'string',
      default: '/home/umen/YouTube/music_video/'
    },
    RV2_path: {
      title: 'Path to RV2 (Random Video FOLDER number 2)',
      description: 'RV : sound enabled, loop disabled, autopause disabled.',
      type: 'string',
      default: '/home/umen/YouTube/SWIFT/ERB/best/'
    },
    RVL_path: {
      title: 'Path to RVL (Random Video Loop FOLDER)',
      description: 'RV : sound disabled, loop enabled, autopause enabled.',
      type: 'string',
      default: '/home/umen/YouTube/SWIFT/RVL/'
    },
    RVL2_path: {
      title: 'Path to RVL2 (Random Video Loop FOLDER)',
      description: 'RV : sound disabled, loop enabled, autopause enabled.',
      type: 'string',
      default: '/home/umen/Videos/NEW_LOOP/'
    }
  },
  activate() {
    $(document).ready(function() {
      //Video ICONS
      button_open_videos = document.createElement('div');
      button_open_videos.classList.add('inline-block');
      button_open_videos.title = "Open Videos";
      button_open_videos.textContent="🗁";
      //Copy same code
      button_open_videos.onclick = function() {
        dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Videos', extensions: ['mkv', 'avi', 'mp4'] }
        ] }).then(result => {
          console.log("videos opened");
          console.log(result.filePaths);
          console.log(result.filePaths[0]);
          //backgroundVideo.videoPlayer.src=result.filePaths[0];
          backgroundVideo.videoPlayer.open(result.filePaths);
        })
      }

      //Image ICONS
      button_open_images = document.createElement('div');
      button_open_images.classList.add('inline-block');
      button_open_images.title = "Open Images";
      button_open_images.textContent="🖼";
      //Copy same code
      button_open_images.onclick = function() {
        dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Images', extensions: ['jpeg', 'jpg', 'png', 'bmp'] }
        ] }).then(result => {
          console.log("images opened");
          console.log(result.filePaths);
          console.log(result.filePaths[0]);
          //backgroundVideo.videoPlayer.src=result.filePaths[0];
          backgroundVideo.videoPlayer.open_images(result.filePaths);
        })
      }

      button_play = document.createElement('div');
      button_play.classList.add('inline-block');
      button_play.title = "Play / Pause Video (Ctrl+Alt+c)";
      button_play.id = "play_pause";
      button_play.textContent="⏸";
      button_play.style.display="none";
      button_play.style.width="10px";
      button_play.onclick = function() { backgroundVideo.videoPlayer.play_pause() };

      button_stop = document.createElement('div');
      button_stop.classList.add('inline-block');
      button_stop.title = "Stop (Ctrl+Alt+s)";
      button_stop.id = "stop";
      button_stop.style.display="none";
      button_stop.textContent="⏹";
      button_stop.onclick = function() { backgroundVideo.videoPlayer.stop() };

      button_next = document.createElement('div');
      button_next.classList.add('inline-block');
      button_next.title = "Next video (Ctrl+Alt+n) Random selection from playlist or folder RV, RVL...";
      button_next.id = "next_video";
      button_next.style.display="none";
      button_next.textContent="⏭";
      button_next.onclick = function() { backgroundVideo.videoPlayer.next_video() };

      button_random = document.createElement('div');
      button_random.classList.add('inline-block');
      button_random.title = "Random (Ctrl+Alt+r)";
      button_random.id = "toggle_random";
      button_random.textContent="🔀";
      button_random.style.display="none";
      button_random.onclick = function() { backgroundVideo.videoPlayer.toggle_random() };

      button_loop = document.createElement('div');
      button_loop.classList.add('inline-block');
      button_loop.title = "Loop (Ctrl+Alt+l)";
      button_loop.id = "toggle_loop";
      button_loop.textContent="⮔";
      button_loop.style.display="none";
      button_loop.onclick = function() { backgroundVideo.videoPlayer.toggle_loop() };

      button_sound = document.createElement('div');
      button_sound.classList.add('inline-block');
      button_sound.title = "Sound";
      button_sound.id = "toggle_sound";
      button_sound.textContent="🔊";
      button_sound.style.display="none";
      button_sound.onclick = function() { backgroundVideo.videoPlayer.toggle_sound() };

      button_autopause = document.createElement('div');
      button_autopause.classList.add('inline-block');
      button_autopause.title = "Autopause if Atom lost focus";
      button_autopause.id = "toggle_autopause";
      button_autopause.textContent="AP";
      button_autopause.style.display="none";
      button_autopause.onclick = function() { backgroundVideo.videoPlayer.toggle_autopause() };

      button_textshadow = document.createElement('div');
      button_textshadow.classList.add('inline-block');
      button_textshadow.title = "Text-shadow";
      button_textshadow.id = "toggle_textshadow";
      button_textshadow.textContent="TS";
      button_textshadow.onclick = function() { backgroundVideo.videoPlayer.toggle_textshadow() };

      button_auto_change_image = document.createElement('div');
      button_auto_change_image.classList.add('inline-block');
      button_auto_change_image.title = "Randomly change images after "
        +atom.config.get('background-video-player.seconds_change_wallpaper')+ " seconds.";
      button_auto_change_image.id = "toggle_auto_change_image";
      button_auto_change_image.textContent="↺";
      button_auto_change_image.onclick = function() { backgroundVideo.videoPlayer.toggle_auto_change_image() };

      button_random_video = document.createElement('div');
      button_random_video.classList.add('inline-block');
      button_random_video.title = "Random video from " + atom.config.get('background-video-player.RV_path');
      button_random_video.textContent="RV";
      button_random_video.onclick = function() {
        document.getElementById('RV_or_RVL_or_MANUAL_or_MPV').textContent="RV";
        button_random_video.classList.add('status-added');
        button_random_video2.classList.remove('status-added');
        button_random_video_loop.classList.remove('status-added');
        button_random_video_loop2.classList.remove('status-added');
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');
        });
        button_auto_change_image.classList.remove('status-added');
        backgroundVideo.videoPlayer.open_random_videos(atom.config.get('background-video-player.RV_path'));
      };

      button_random_video2 = document.createElement('div');
      button_random_video2.classList.add('inline-block');
      button_random_video2.title = "Random video from " + atom.config.get('background-video-player.RV2_path');
      button_random_video2.textContent="RV2";
      button_random_video2.onclick = function() {
        document.getElementById('RV_or_RVL_or_MANUAL_or_MPV').textContent="RV";
        button_random_video.classList.remove('status-added');
        button_random_video2.classList.add('status-added');
        button_random_video_loop.classList.remove('status-added');
        button_random_video_loop2.classList.remove('status-added');
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');
        });
        button_auto_change_image.classList.remove('status-added');
        backgroundVideo.videoPlayer.open_random_videos(atom.config.get('background-video-player.RV2_path'));
      };

      button_random_video_loop = document.createElement('div');
      button_random_video_loop.classList.add('inline-block');
      button_random_video_loop.title = "Random video in a loop from " + atom.config.get('background-video-player.RVL_path');
      button_random_video_loop.textContent="RVL";
      button_random_video_loop.onclick = function() {
        document.getElementById('RV_or_RVL_or_MANUAL_or_MPV').textContent="RVL";
        button_random_video.classList.remove('status-added');
        button_random_video2.classList.remove('status-added');
        button_random_video_loop.classList.add('status-added');
        button_random_video_loop2.classList.remove('status-added');
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');
        });
        button_auto_change_image.classList.remove('status-added');
        //LOOP =1
        backgroundVideo.videoPlayer.open_random_videos(atom.config.get('background-video-player.RVL_path'),1);
        backgroundVideo.videoPlayer.loop=true;
        backgroundVideo.videoPlayer.muted=true;
      };

      button_random_video_loop2 = document.createElement('div');
      button_random_video_loop2.classList.add('inline-block');
      button_random_video_loop2.title = "Random video in a loop from "
        + atom.config.get('background-video-player.RVL2_path');
      button_random_video_loop2.textContent="RVL2";
      button_random_video_loop2.onclick = function() {
        document.getElementById('RV_or_RVL_or_MANUAL_or_MPV').textContent="RVL";
        button_random_video.classList.remove('status-added');
        button_random_video2.classList.remove('status-added');
        button_random_video_loop.classList.remove('status-added');
        button_random_video_loop2.classList.add('status-added');
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');
        });
        button_auto_change_image.classList.remove('status-added');
        //LOOP =1
        backgroundVideo.videoPlayer.open_random_videos(atom.config.get('background-video-player.RVL2_path'),1);
        backgroundVideo.videoPlayer.loop=true;
        backgroundVideo.videoPlayer.muted=true;
      };

      button_switch_to_from_mpv = document.createElement('div');
      button_switch_to_from_mpv.classList.add('inline-block');
      button_switch_to_from_mpv.title = "Switch to and from mpv player.";
      button_switch_to_from_mpv.textContent="MPV";
      button_switch_to_from_mpv.onclick = function() {
        button_random_video.classList.remove('status-added');
        button_random_video2.classList.remove('status-added');
        button_random_video_loop.classList.remove('status-added');
        button_random_video_loop2.classList.remove('status-added');
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');
        });
        button_auto_change_image.classList.remove('status-added');
        backgroundVideo.videoPlayer.switch_to_from_mpv();
      };

      button_youtube = document.createElement('div');
      button_youtube.classList.add('inline-block');
      button_youtube.title = "Open Youtube.";
      button_youtube.textContent="YT";
      button_youtube.onclick = function() {
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');;
        });
        backgroundVideo.videoPlayer.youtube("https://www.youtube.com/watch?v=h8MeMpYICn8");
      };

      button_original_image = document.createElement('div');
      button_original_image.classList.add('inline-block');
      button_original_image.title = "Original image : "
        +atom.config.get('background-video-player.default_image');
      button_original_image.textContent="Oi";
      button_original_image.onclick = function() {
        document.querySelectorAll(".RI").forEach(function(elem){
          elem.classList.remove('status-added');
        });
        backgroundVideo.videoPlayer.default_image(atom.config.get('background-video-player.default_image'));
      };

      button_image_under_minimap = document.createElement('div');
      button_image_under_minimap.classList.add('inline-block');
      button_image_under_minimap.title = "Minimap : Enable/Disable wallpaper under minimap";
      button_image_under_minimap.textContent="Mi";
      if(atom.config.get('background-video-player.underMinimap')==true){
        button_image_under_minimap.classList.add('status-added');
      }
      button_image_under_minimap.onclick = function() {
        if(atom.config.get('background-video-player.underMinimap')==false){
          atom.config.set('background-video-player.underMinimap',true);
          button_image_under_minimap.classList.add('status-added');
          backgroundVideo.videoPlayer.set_image_position();
        }
        else{
          atom.config.set('background-video-player.underMinimap',false);
          button_image_under_minimap.classList.remove('status-added');
          backgroundVideo.videoPlayer.set_image_position();
        }
      };

      var NB_OF_RI=atom.config.get('background-video-player.number_of_RI');
      var button_random_image_array = [];
      for(i=1;i!=NB_OF_RI+1;i++){
        RI_PATH='background-video-player.RI'+i+'_path';
        tmp_button_random_image = document.createElement('div');
        tmp_button_random_image.classList.add('inline-block');
        tmp_button_random_image.classList.add('RI');
        tmp_button_random_image.title = "Random image from " + atom.config.get(RI_PATH);
        tmp_button_random_image.textContent="Ri" +i;
        tmp_button_random_image.dataPath=atom.config.get(RI_PATH);
        tmp_button_random_image.dataNumber=i;
        tmp_button_random_image.onclick = function() {
          button_random_video.classList.remove('status-added');
          button_random_video2.classList.remove('status-added');
          button_random_video_loop.classList.remove('status-added');
          button_random_video_loop2.classList.remove('status-added');
          document.querySelectorAll(".RI").forEach(function(elem){
            elem.classList.remove('status-added');
          });
          this.classList.add('status-added');
          backgroundVideo.videoPlayer.open_random_images(this.dataPath);
        };
        button_random_image_array.push(tmp_button_random_image);
      }

      let footerBar = atom.workspace.getFooterPanels();
      footerBar[0].getItem().leftPanel.appendChild(button_textshadow);
      footerBar[0].getItem().leftPanel.appendChild(button_open_videos);
      footerBar[0].getItem().leftPanel.appendChild(button_open_images);
      footerBar[0].getItem().leftPanel.appendChild(button_original_image);
      for(i=0;i!=NB_OF_RI;i++){
        footerBar[0].getItem().leftPanel.appendChild(button_random_image_array[i]);
      }
      // footerBar[0].getItem().leftPanel.appendChild(button_random_image);
      // footerBar[0].getItem().leftPanel.appendChild(button_random_image2);
      footerBar[0].getItem().leftPanel.appendChild(button_auto_change_image);
      footerBar[0].getItem().leftPanel.appendChild(button_image_under_minimap);
      footerBar[0].getItem().leftPanel.appendChild(button_random_video);
      footerBar[0].getItem().leftPanel.appendChild(button_random_video2);
      footerBar[0].getItem().leftPanel.appendChild(button_random_video_loop);
      footerBar[0].getItem().leftPanel.appendChild(button_random_video_loop2);

      footerBar[0].getItem().leftPanel.appendChild(button_play);
      footerBar[0].getItem().leftPanel.appendChild(button_stop);
      footerBar[0].getItem().leftPanel.appendChild(button_next);
      footerBar[0].getItem().leftPanel.appendChild(button_random);
      footerBar[0].getItem().leftPanel.appendChild(button_loop);
      footerBar[0].getItem().leftPanel.appendChild(button_sound);
      footerBar[0].getItem().leftPanel.appendChild(button_autopause);
      footerBar[0].getItem().leftPanel.appendChild(button_switch_to_from_mpv);
      footerBar[0].getItem().leftPanel.appendChild(button_youtube);

      // backgroundVideo.videoPlayer.autostart("file:///home/umen/autostart.mp4");
      backgroundVideo.videoPlayer.default_image(atom.config.get('background-video-player.default_image'));
      document.getElementsByTagName("head")[0].insertAdjacentHTML(
          "beforeend",
          "<link rel=\"stylesheet\" \
          href=\"/home/umen/.atom/packages/background-video-player/switch_styles/"+
          atom.config.get('background-video-player.css_shadow')+"\" \
          id=\"CSS_text_shadow\" />");
      //Add this DOM to check if RV or RVL was launched (next_video should use different directories)
      document.getElementsByTagName("body")[0].insertAdjacentHTML(
        "beforeend",
        "<div id='RV_or_RVL_or_MANUAL_or_MPV' style='display:none;'></div>\
        <div id='backup_RV_or_RVL_or_MANUAL' style='display:none;' ></div>\
        <div style='display:none;' id='current_video_folder'></div>\
        <div style='display:none;' id='run_change_wallpaper_only_once'>0</div>\
        <div style='display:none;' id='current_random_images_path'>0</div>");
    });
// <video id='YOUTUBE' style='position:absolute;top:0;z-index:3 !important;' \
// data-yt2html5='https://www.youtube.com/watch?v=h8MeMpYICn8'></video>
// <div id='wrapper_youtube' style='position:absolute;top:0;z-index:3width:1024px;height:768px;'>\
// <iframe id='youtube' style='width:100%;height:100%;'\
//   src='https://www.youtube.com/embed/h8MeMpYICn8?wmode=transparent&autoplay=1'></iframe>\
// </div>
    atom.commands.add('atom-workspace', {
      "background-video-player:open": () => dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Videos', extensions: ['mkv', 'avi', 'mp4', 'webm'] }
      ] }).then(result => {
        console.log("video opened");
        console.log(result.filePaths);
        console.log(result.filePaths[0]);
        //backgroundVideo.videoPlayer.src=result.filePaths[0];
        backgroundVideo.videoPlayer.open(result.filePaths);
      }),
        "background-video-player:open_images": () => dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'],
        filters: [
          { name: 'Images', extensions: ['jpeg', 'jpg', 'png', 'bmp'] }
        ] }).then(result => {
          console.log("images opened");
          console.log(result.filePaths);
          console.log(result.filePaths[0]);
          //backgroundVideo.videoPlayer.src=result.filePaths[0];
          backgroundVideo.videoPlayer.open_images(result.filePaths);
        }),
      "background-video-player:stop": () => backgroundVideo.videoPlayer.stop(),
      "background-video-player:play_pause": () => backgroundVideo.videoPlayer.play_pause(),
      "background-video-player:toggle_loop": () => backgroundVideo.videoPlayer.toggle_loop(),
      "background-video-player:toggle_sound": () => backgroundVideo.videoPlayer.toggle_sound(),
      "background-video-player:toggle_random": () => backgroundVideo.videoPlayer.toggle_random(),
      "background-video-player:toggle_autopause": () => backgroundVideo.videoPlayer.toggle_autopause(),
      "background-video-player:next_video": () => backgroundVideo.videoPlayer.next_video()
    });
  }
};
