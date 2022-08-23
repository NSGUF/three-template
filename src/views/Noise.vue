<template>
  <div ref="container"></div>
</template>

<script setup lang="ts">

import {ref} from 'vue';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';
import snoise from 'glsl-noise/simplex/4d.glsl';
import { onMounted } from "vue";
import { Object3D } from "three";

let w = window.innerWidth;
let h = window.innerHeight;
let k = w / h;

const container = ref(null);
const scene = new THREE.Scene();
let camera: THREE.PerspectiveCamera;
let renderer;
const stats = Stats();
let controls;
function init (meshs: (Object3D | (() => Object3D)) []) {
    meshs.forEach(mesh => {
        if (typeof mesh === 'function') {
            scene.add(mesh());
        } else {
            scene.add(mesh);
        }
    });
    camera = new THREE.PerspectiveCamera(60, k, 1, 10000);
    camera.position.set(600, 0, 1000);
    camera.lookAt(scene.position);

    // 设置环境光
    let ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    // 设置帮助工具
    let helper = new THREE.AxesHelper(1000);
    scene.add(helper);

    renderer = new THREE.WebGLRenderer({
        // 抗锯齿：边缘柔化，可以消除混叠
        antialias: true,
    });

    // 设置render配置
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050533, 1);

    container.value.appendChild(renderer.domElement);
    container.value.style.touchAction = 'none';

    container.value.appendChild(stats.dom);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

}

function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

const pointMaterial = new THREE.ShaderMaterial({
    uniforms: {
        u_time: {
            value: 0.3
        },
        u_amplitude: {
            value: 17
        },
        u_frequency: {
            value: 3
        },
    },
    vertexShader: snoise + `
        precision highp float;
        attribute float opacity;

        uniform float u_time;
        uniform float u_amplitude;
        uniform float u_frequency;

        varying vec3 vNormal;

        void main () {
            vNormal = normalMatrix * normalize(normal);
            float distortion = snoise(vec4(normal * u_frequency, u_time)) * u_amplitude;
            vec3 newPosition = position + (normal * distortion);

            vec4 mPosition = modelViewMatrix * vec4(newPosition, 1.0);

            if (mPosition.z < 0.0) {
                gl_PointSize = 0.0;
            }

            gl_PointSize = opacity * 1.0;
            gl_Position = projectionMatrix * mPosition;
        }
    `,
    fragmentShader: `
        varying vec3 vNormal;

        void main () {
            vec3 viewNv = normalize(vNormal);
            vec3 nvColor = viewNv * 0.5 + 0.5;
            gl_FragColor = vec4(nvColor, 1.0);
        }
    `,
    transparent: true,
});
function initCenter () {
    const icosahedron = new THREE.IcosahedronGeometry(150, 60);
    const posistionAttribute = icosahedron.getAttribute('position');
    const size = [];
    for (let i = 0; i < posistionAttribute.count; i++) {

        // 这里修改属性
        size[i] = 5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', posistionAttribute);
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(size, 1));
    geometry.setAttribute('normal', icosahedron.getAttribute('normal'));
    return new THREE.Points(geometry, pointMaterial);
}

let pre = new Date();
function animate () {
    requestAnimationFrame(animate);
    let now = new Date();
    pointMaterial.uniforms.u_time.value += (Number(now) - Number(pre)) * 0.0005;
    pre = now;
    renderer.render(scene, camera);
    controls.update();
    stats.update();

}
onMounted(() => {
    init([
        initCenter(),
    ]);

    window.addEventListener('resize', onWindowResize)

    animate();
});

</script>
