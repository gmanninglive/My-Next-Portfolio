import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  FlyControls,
  OrbitControls,
  Stars,
  useTexture,
} from "@react-three/drei";

import { useRef, useEffect, useState, Suspense } from "react";

const Text = dynamic(() => import("./Text"), {
  ssr: false,
});

const { PI, sin, cos } = Math;

//Main Text Mesh
function Name() {
  const ref = useRef();

  return (
    <Suspense fallback={"loading"}>
      <group ref={ref}>
        <Text hAlign="center" position={[-12, 70, 0]} text="GEORGE" />
        <Text hAlign="center" position={[-12, 0, 0]} text="MANNING" />
      </group>
    </Suspense>
  );
}
function Developer() {
  const ref = useRef();
  console.log(ref);

  // Developer Text Animation
  useFrame(({ clock }) => {
    if (ref !== undefined) {
      ref.current.rotation.y =
        ref.current.rotation.z =
        ref.current.rotation.x =
          clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <Suspense fallback={"loading"}>
      <group ref={ref}>
        <Text
          hAlign="center"
          position={[0, -250, 0]}
          text="Full Stack Developer"
          size={0.5}
        />
      </group>
    </Suspense>
  );
}

function Torus() {
  const texture = useTexture("/textures/NormalMap.png");
  const ref = useRef();
  // Torus Animation
  useFrame(({ clock }) => {
    if (ref !== undefined) {
      ref.current.rotation.z = ref.current.rotation.x =
        clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[0, 150, 0]} castShadow>
      <torusKnotGeometry args={[30, 10, 100, 10]} />
      <meshNormalMaterial
        metalness={1}
        roughness={0}
        normalMap={texture}
        color="red"
        reflectivity={1}
      />
    </mesh>
  );
}

export default function Hero() {
  return (
    <div className="h-3/4">
      <Canvas
        camera={{ position: [0, 20, 400], fov: 100, near: 0.1, far: 1000 }}
      >
        <ambientLight intensity={5} />
        <pointLight position={[0, 150, 0]} angle={0.5} intensity={20} />
        <pointLight position={[40, 30, 40]} color={0xff0000} intensity={100} />
        <OrbitControls />
        <FlyControls />
        <Stars />
        <Name />
        {/* <Developer /> */}
        <Suspense fallback="loading">
          <Torus />
        </Suspense>
      </Canvas>
    </div>
  );
}
