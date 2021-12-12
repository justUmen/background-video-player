# Background video player for Atom

For best rendering, add in the option line-height: 1.2 To avoid transparency in between lines
And desired font : "Source Code Pro Black"

*** BROKEN ON SELECTION THAT IS IN THE BACKGROUND FOR SOME REASON ***

## Usage

### Play videos in background

#### Todo :

- inject youtube (youtube-dl) ??? switch to mpv too ???

- SOME THEMES PUT COLOR ABOVE BACKGROUND IMAGE (Nord Atom for example)... :(
  (Need to edit theme manually, cannot find JS or CSSthat works with !important... - .item-views)

- progressbar not good position for all themes :P

- allow several images to be managed like next_video (next_image ?)

- images : not use image if (height > width)

- include audio player ?? (use video with displaying,playing audio only ?)

- disable video but keep playing audio on focus change, instead of pausing

- allow previous video (add button too)

- disable / enable line-numbers background color ???

- disable / enable dim background

- buttons to see enable / disable status (green/gray ???)

- change images automatically after x seconds (random from folder) - Or

- allow to add an unlimited amount of RV / RVL / RI... in settings

- range of background opacity in settings

- Add button for Real_ESRGAN

- ctrl + alt + m : next image ???

- transfer to/from mpv player :-)

# XTRA (Not directly related to background-video-player but to Atom in general on my personal configuration)

1 - I want to switch displayCodeHighlights on text selection, to see it better on the minimap,
Need to change 2 functions in the "highlight-selected" plugin :

search-model.js :

`static makeClasses() {
  atom.config.set('minimap.displayCodeHighlights', 'false');`

selection-manager.js :

`removeAllMarkers() {
  atom.config.set('minimap.displayCodeHighlights', 'true');`

2 - Refresh the css right position of wallpaper to avoid minimap by changing "tree-view-autoresize" plugin :
On hide/show tree-view, the background wallpaper goes under the minimap plugin...

tree-view-autoresize.coffee :

`resizeTreeView: ->
    setTimeout =>
      document.querySelectorAll(".item-views")[1].style.backgroundPosition="top 0px right "
        + document.getElementsByTagName('atom-text-editor-minimap')[0].width + "px";`
