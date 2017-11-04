const iframe = document.getElementById('api-frame')
const version = '1.0.0'
const urlid = '1663083e3d0f46bb99efccd8a4a8f941'

/* global Sketchfab */
const client = new Sketchfab(version, iframe)

// https://sketchfab.com/developers/viewer/initialization
client.init(urlid, {
  transparent: 1,
  preload: 1,
  autostart: 0,
  ui_stop: 0,
  ui_fullscreen: 1,
  ui_help: 0,
  ui_infos: 0,
  ui_inspector: 0,
  // ui_general_controls: 0,
  success: (api) => {
    api.start()
    api.addEventListener('viewerready', () => {
      // API is ready to use
      // Insert your code here
      console.log('Viewer is ready') // eslint-disable-line no-console
    })
  },
  error: (err) => {
    console.log('Viewer error', err) // eslint-disable-line no-console
  },
})
