//import * as THREE from "three";
//import "three.min.js";
import Stat from "./three/examples/jsm/libs/stats.module.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

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
document.body.append(stat.domElement);

//three自带
const clock = new THREE.Clock();
tick();
function tick() {
  //time一直均匀增加
  const time = clock.getElapsedTime();

  //cube.rotation.x = time;

  cube.position.x = Math.sin(time);
  cube.position.y = Math.cos(time);

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
}
