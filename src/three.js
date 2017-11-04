/**
 * https://threejs.org/docs/#manual/introduction/Creating-a-scene
 * https://threejs.org/docs/#examples/loaders/OBJLoader*
 * https://threejs.org/examples/webgl_loader_obj.html
 */

 /* global THREE */

// var THREE = require('three')
// import { default as THREE } from 'three'
import oBJLoader from 'three-obj-loader'

oBJLoader(THREE)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.8)
camera.add(pointLight)


const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const loader = new THREE.OBJLoader()

// load a resource
loader.load(
	'teapot.obj', // resource URL
  (object) => { 	// called when resource is loaded
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

camera.position.y = 2
camera.position.z = 5


// renderer.render(scene, camera)

/*
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
animate()*/
