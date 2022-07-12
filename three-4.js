import Stat from "./three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

// Scene 场景
const scene = new THREE.Scene();

//坐标系
const axes = new THREE.AxesHelper(2, 2, 2);
scene.add(axes);

//obejects
//立方体
const g = new THREE.BoxGeometry(1, 1, 1);
//basic 基础的、单色的
// const m = new THREE.MeshBasicMaterial({
//   color: 0xff00ee,
// });
const m = new THREE.MeshNormalMaterial();

const cube = new THREE.Mesh(g, m);
scene.add(cube);

//camera
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

//control初始化
const orbitControls = new OrbitControls(camera, renderer.domElement);

//动效 根据时间
const clock = new THREE.Clock();
tick();
function tick() {
  //time一直均匀增加
  const time = clock.getElapsedTime();

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();
}
