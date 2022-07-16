import Stat from "./three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
//import { add } from "./three/examples/jsm/nodes/Nodes.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

// Scene 场景
const scene = new THREE.Scene();

//坐标系
const axes = new THREE.AxesHelper(200000, 200000, 200000);
scene.add(axes);

//obejects
//group
const car = new THREE.Group();

const body = new THREE.Group();
//通用材质
const material = new THREE.MeshNormalMaterial();

const bydyCube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 0.5), material);
body.add(bydyCube1);

const bydyCube2 = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
bydyCube2.position.z = 0.5;

body.add(bydyCube2);

car.add(body);

//轮子1 group

const wheelGroup1 = new THREE.Group();

//轮毂
const wheel1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.4), material);
wheelGroup1.position.set(-0.4, 0.6, -0.15);

const wheelGroup2 = new THREE.Group();
const wheel2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.4), material);
wheelGroup2.position.set(-0.4, -0.6, -0.15);

const wheelGroup3 = new THREE.Group();
const wheel3 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.4), material);
wheelGroup3.position.set(0.4, -0.6, -0.15);

const wheelGroup4 = new THREE.Group();
const wheel4 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.4), material);
wheelGroup4.position.set(0.4, 0.6, -0.15);

//轮胎
const circle = new THREE.Group();
let n = 30;
for (let i = 0; i < n; i++) {
  let r = 0.3;
  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.x = r * Math.cos(((Math.PI * 2) / n) * i);
  mesh.position.y = r * Math.sin(((Math.PI * 2) / n) * i);
  circle.add(mesh);
}

circle.rotation.y = -0.5 * Math.PI;

wheelGroup1.add(circle);
wheelGroup2.add(circle.clone());
wheelGroup3.add(circle.clone());
wheelGroup4.add(circle.clone());

wheelGroup1.add(wheel1);
wheelGroup2.add(wheel2);
wheelGroup3.add(wheel3);
wheelGroup4.add(wheel4);

car.add(wheelGroup1);
car.add(wheelGroup2);
car.add(wheelGroup3);
car.add(wheelGroup4);

scene.add(car);
//camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(1, 1, 1);
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
  wheelGroup4.rotation.x = time;
  wheelGroup3.rotation.x = time;
  wheelGroup2.rotation.x = time;
  wheelGroup1.rotation.x = time;

  car.position.y = Math.sin(time);

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();
}
