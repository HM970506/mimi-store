"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

export default function Main3d() {
  const [scene, setScene] = useState<any>(new THREE.Scene());
  const [camera, setCamera] = useState<any>(
    new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    )
  );
  const [renderer, setRenderer] = useState<any>(new THREE.WebGLRenderer());
  const [textureLoader, setTextureLoader] = useState<any>(
    new THREE.TextureLoader()
  );
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const mount = useRef<HTMLDivElement | null>(null);

  function animate(cube: any, initialAngle: any) {
    if (renderer) {
      //렌더링.
      //setinterval대신 requestAnimationFrame를 쓰자.
      //그건 사용자가 다른 브라우저 탭으로 이동할 때 자동으로 일시 정지된다.
      requestAnimationFrame(() => animate(cube, initialAngle));

      cube.rotation.y += 0.05;

      const circleCenterX = 0;
      const circleCenterZ = 0;
      const radius = 100;

      const angle = initialAngle + cube.rotation.y * 0.05; // 초기 각도에 회전 각도를 더하여 위치 계산
      cube.position.x = circleCenterX + Math.sin(angle) * radius;
      cube.position.z = circleCenterZ + Math.cos(angle) * radius;

      renderer.setPixelRatio(window.devicePixelRatio);

      renderer.render(scene, camera);
    }
  }

  function animate2(cube: any) {
    if (renderer) {
      requestAnimationFrame(() => animate2(cube));

      cube.rotation.y += 0.001;

      renderer.render(scene, camera);
    }
  }

  useEffect(() => {
    scene.background = new THREE.Color("white");
    const light = new THREE.DirectionalLight(0xffffff, 10);
    scene.add(light);
    camera.position.y = 100;
    camera.position.z = 180;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //camera.poisitiob값이 없으면 orbitcontrols는 동작하지 않는다!
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.target.set(0, 0, 0);
    controls.autoRotate = true;

    heart();
    rotation();
    text();
  }, []);

  const heart = async () => {
    const loader = new GLTFLoader();
    loader.load(`/glft/heart/scene.gltf`, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material.color.set(0x000000);
        gltf.scene.position.y = 0;
        scene.add(gltf.scene);
        animate2(gltf.scene);
      });
    });
  };

  const rotation = async () => {
    //프로미스로 수정하기
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2; // 360도를 objectCount로 나눈 각도

      const geometry = new THREE.BoxGeometry(20, 20, 0.1);
      const texture = await textureLoader.loadAsync("image/bear.jpg");
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const object = new THREE.Mesh(geometry, material);
      object.position.x = Math.sin(angle) * 100;
      object.position.y = 50;
      object.position.z = Math.cos(angle) * 100;
      object.scale.x = 1;
      object.scale.y = 1;

      scene.add(object);

      animate(object, angle);
    }
  };

  const text = async () => {
    const test = new TextGeometry("test");

    // const loader = new FontLoader();
    // const font = await loader.loadAsync("/font/Agbalumo/Agbalumo-Regular.json");
    // //refreshText();
    // const textGeo = new TextGeometry("Welcome to MIMI's", {
    //   font: font,
    //   size: 70,
    //   height: 20,
    // });
    // textGeo.computeBoundingBox();
    // const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    // const textMesh = new THREE.Mesh(textGeo, material);
    // scene.add(textMesh);
    // renderer.render()(scene, camera);
  };

  useEffect(() => {
    if (mount.current) {
      renderer.setSize(window.innerWidth, window.innerHeight);
      //렌더링 크기. 값이 작을수록 고성능이 필요하다.
      //렌더링 크기를 유지하되 더 낮은 해상도로 렌더링하려면 뒤에 false(updateStyle)를 붙여주자.

      renderer.render(scene, camera);

      if (!mount.current.querySelector("canvas"))
        mount.current.appendChild(renderer.domElement);
    }
    return () => {
      // 컴포넌트가 언마운트될 때 Three.js 리소스 정리
      if (renderer) renderer.dispose();
    };
  }, [mount]);

  // const canvasClick=()=>{
  //   const      raycaster = new THREE.Raycaster();
  //   raycaster.setFromCamera( mouse, camera );

  //   let intersects = raycaster.intersectObjects( scene.children );
  //   let SELECTED = intersects[0].object;

  //   if ( intersects.length > 0 ) {
  //       if ( SELECTED !== intersects[0].object )
  //       {

  //           if ( SELECTED ) SELECTED.material.emissive.setHex( SELECTED.currentHex );

  //           SELECTED = intersects[0].object;
  //           SELECTED.currentHex = SELECTED.material.emissive.getHex();
  //           SELECTED.material.emissive.setHex( 0xff0000 );

  //       }
  //   }
  //   else
  //   {
  //       if ( SELECTED )
  //       {
  //           SELECTED.material.emissive.setHex( SELECTED.currentHex );
  //           SELECTED = null;
  //       }
  //   }

  //   renderer.render( scene, camera );
  // }

  return (
    <div
      ref={mount}
      onClick={(event: any) => {
        event.preventDefault();

        let gapX = event.clientX - event.offsetX;
        let gapY = event.clientY - event.offsetY;

        mouse.x = ((event.clientX - gapX) / event.target.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - gapY) / event.target.clientHeight) * 2 + 1;
      }}
    />
  );
}
