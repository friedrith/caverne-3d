/**
 * https://threejs.org/docs/#manual/introduction/Creating-a-scene
 * https://threejs.org/docs/#examples/loaders/OBJLoader*
 * https://threejs.org/examples/webgl_loader_obj.html
 */

 /* global THREE */

// var THREE = require('three')
// import { default as THREE } from 'three'
import oBJLoader from 'three-obj-loader'

import FirstPersonControls from './first-person-controls'

oBJLoader(THREE)

let camera
let scene
let renderer

function init() {
  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100)
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

  /*
  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
  scene.add(ambientLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.8)
  camera.add(pointLight)

  var spotLight = new THREE.SpotLight(0xffffff)
  spotLight.position.set(-40, 60, -10)
  spotLight.castShadow = true
  scene.add(spotLight)
  */

  // show axes in the screen
  const axes = new THREE.AxisHelper(20)
  scene.add(axes)

  // create the ground plane
  const planeGeometry = new THREE.PlaneGeometry(60, 20)
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI
  plane.position.x = 15
  plane.position.y = -10
  plane.position.z = 0
  // add the plane to the scene
  scene.add(plane)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMapEnabled = true

  document.body.appendChild(renderer.domElement)

  const loader = new THREE.OBJLoader()

  // load a resource
  loader.load(
    'maillage.obj', // resource URL
    (object) => { 	// called when resource is loaded
      object.position.x = 0
      object.position.y = 0
      object.position.z = 0

      console.log('loaded') // eslint-disable-line no-console
      scene.add(object)

      renderer.render(scene, camera)
    },
    (xhr) => { 	// called when loading is in progresses
      console.log(`${xhr.loaded / xhr.total * 100} % loaded`) // eslint-disable-line no-console
    },
    (error) => { 	// called when loading has errors
      console.log('An error happened', error) // eslint-disable-line no-console
    }
  )

  camera.position.x = 100;
  camera.position.y = 10;
  camera.position.z = 10;
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  var camControls = new FirstPersonControls(camera);
  camControls.lookSpeed = 0.4;
  camControls.movementSpeed = 20;
  camControls.noFly = true;
  camControls.lookVertical = true;
  camControls.constrainVertical = true;
  camControls.verticalMin = 1.0;
  camControls.verticalMax = 2.0;
  camControls.lon = -150;
  camControls.lat = 120;

  camControls.update()

  function animate() {


    // required if controls.enableDamping or controls.autoRotate are set to true
    camControls.update();
    renderer.clear();
    requestAnimationFrame( animate );

    renderer.render( scene, camera )



    // console.log('camera.position', camera.position)

  }

  animate();


  // const vMouseSpeed = 0.01
  // const hMouseSpeed = 0.01

  /*

  const xSpeed = 0.1
  const zSpeed = 0.1
  const ySpeed = 0.1

  function onDocumentKeyDown(event) {
      var keyCode = event.which;
      if (keyCode === 90) { // z
          camera.position.z += zSpeed
      } else if (keyCode === 83) { // s
          camera.position.z -= zSpeed
      } else if (keyCode === 65) { // a
          camera.position.y += ySpeed
      } else if (keyCode === 69) { // e
          camera.position.y -= ySpeed
      } else if (keyCode === 81) { // q
          // camera.position.x -= xSpeed
          camera.rotation.y = camera.rotation.y + 0.01
          console.log('rotation', )
      } else if (keyCode === 68) { // d
          camera.position.x += xSpeed
      } else if (keyCode === 32) {
          camera.position.set(0, 0, 0)
      }


      renderer.render(scene, camera)
  }*/

  /*

  // renderer.render(scene, camera)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)


  const animate = () => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        animate()
      }, 100)
    })

    // cube.rotation.x += 0.1
    cube.rotation.y += 0.1
    renderer.render(scene, camera)
  }
  //animate()*/
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.onload = init

window.addEventListener('resize', onResize, false)
