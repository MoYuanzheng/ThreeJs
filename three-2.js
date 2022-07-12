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

//计时运动 1
setInterval(() => {
  // cube.rotation.z += 1;
  // renderer.render(scene, camera);
}, 100);
//由于中间还有计算时间，该时间并不准确

//计时运动 2
//采用requestAnimationFrame
//每 tick() 一次，屏幕显示一帧
// function tick() {
//   cube.rotation.z += 0.01;
//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// }
// tick();
//故不同显示器，显示效果不一致
//60hz 60 + 0.01 = 0.6度
//120hz 120 + 0.01 = 1.2度

//计时运动 3
//获得每次tick()执行间隔时间
//从而对其进行修正
// let time = Date.now();
// function tick() {
//   let currentTime = Date.now();
//   let deltaTime = currentTime - time;
//   time = currentTime;

//   cube.rotation.z += deltaTime / 1000;

//   renderer.render(scene, camera);

//   requestAnimationFrame(tick);
// }
// tick();

//计时运动 4
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
