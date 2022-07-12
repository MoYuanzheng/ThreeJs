//import * as THREE from "three";
//import "three.min.js";

const w = window.innerWidth;
const h = window.innerHeight;

// 房间 == 3d容器
// Scene 场景
const scene = new THREE.Scene();

//obeject
const axes = new THREE.AxesHelper(2, 2, 2);

scene.add(axes);

//东西 - 家电、家具
//物体：geometry 几何体  + material 材质、皮肤
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial();

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//Position
// cube.position.x = -1;
// cube.position.y = -1;
// cube.position.z = -1;
cube.position.set(0, 0, 0);

//Rotation
cube.rotation.x = (45 / 180) * Math.PI;
cube.rotation.y = (60 / 180) * Math.PI;
//cube.rotation.Z = (45 / 180) * Math.PI;

//Scale
cube.scale.x = 2;
cube.scale.y = 2;
cube.scale.z = 2;
//cube.scale.set(6, 6, 6);

//光线 台灯、吊灯、太阳光
const light = new THREE.AmbientLight();

scene.add(light);

//camera
//相机  宽高比
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);

//Renderer
//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, camera);

document.body.append(renderer.domElement);
