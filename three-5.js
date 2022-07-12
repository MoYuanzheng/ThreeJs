import Stat from "./three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

// Scene 场景
const scene = new THREE.Scene();

//坐标系
const axes = new THREE.AxesHelper(200000, 200000, 200000);
//scene.add(axes);

//obejects
//group
const group = new THREE.Group();

//立方体
const g1 = new THREE.BoxGeometry(1, 1, 1);

const m1 = new THREE.MeshNormalMaterial();

const cube1 = new THREE.Mesh(g1, m1);

cube1.position.y = -1.5;

group.add(cube1);

const g2 = new THREE.BoxGeometry(1, 1, 1);

const m2 = new THREE.MeshNormalMaterial();

const cube2 = new THREE.Mesh(g2, m2);
group.add(cube2);

const g3 = new THREE.BoxGeometry(1, 1, 1);

const m3 = new THREE.MeshNormalMaterial();

const cube3 = new THREE.Mesh(g3, m3);

cube3.position.y = 1.5;

group.add(cube3);

scene.add(group);

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
  group.rotation.x = time;
  // cube2.rotation.y = time;
  // cube3.rotation.z = time;
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();
}
