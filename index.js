import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
 
// camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//  cube and sphere
var geometryCube = new THREE.BoxGeometry(1, 1, 1);
var materialCube = new THREE.MeshStandardMaterial({ color: "#F1D4E5", roughness: 0.4, metalness: 0.6 });
var cube = new THREE.Mesh(geometryCube, materialCube);
cube.position.x = 1;
scene.add(cube);

var geometrySphere = new THREE.SphereGeometry(0.5, 32, 32);
var materialSphere = new THREE.MeshStandardMaterial({ color: "#EAB2A0" });
var sphere = new THREE.Mesh(geometrySphere, materialSphere);
sphere.position.x = -2;
scene.add(sphere);
 
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor("#F0DBDB");
// renderer - shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// orbit controls , 
var controls = new OrbitControls( camera, renderer.domElement);

// object loader 
var loader = new GLTFLoader();
loader.load('./src/wooden_door/door.gltf', function (gltf) {
    var door = gltf.scene;

    door.position.set(-4, -1, 0);
    door.rotation.y = Math.PI / 2;
    door.scale.set(0.5, 0.5, 0.5);

    door.castShadow = true;
    door.receiveShadow = true;

    scene.add(door);
});

// light and shadow
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 0);
light.target.position.set(0, 0, 0);
light.intensity = 2;
light.castShadow = true;

// shadow props
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 50;
light.shadow.camera.left = -5;
light.shadow.camera.right = 5;
light.shadow.camera.top = 5;
light.shadow.camera.bottom = -5;

scene.add(light);
 
// enable objects' shadow 
materialCube.castShadow = true;
materialSphere.castShadow = true;
materialCube.receiveShadow = true;
materialSphere.receiveShadow = true;

cube.castShadow = true; 
sphere.castShadow = true;  
 
// enable reflections on objects 
materialCube.envMap = renderer.LinearEncoding;
materialCube.envMapIntensity = 1; 

// requestanimation track
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();