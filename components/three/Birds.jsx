import * as THREE from 'three'
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { useLoader, useFrame} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// This component was auto-generated from GLTF by: https://github.com/react-spring/gltfjsx
function Bird({ speed, factor, url, ...props }) {
    const { nodes, materials, animations } = useLoader(GLTFLoader, url)
    console.log(nodes)
    const group = useRef()
    const mesh = useRef()
    const [start] = useState(() => Math.random() * 5000)
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useEffect(() => void mixer.clipAction(animations[0], group.current).play(), [])
    useFrame((state, delta) => {
      mesh.current.position.y = Math.sin(start + state.clock.elapsedTime) * 5
      mesh.current.rotation.x = Math.PI / 2 + (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 10
      mesh.current.rotation.y = (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 2
      group.current.rotation.y += Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 1.5
      mixer.update(delta * speed)
    })
    return (
      <group ref={group} dispose={null}>
        <scene name="Scene" {...props}>
          <mesh
            ref={mesh}
            scale={1.5}
            name="Object_0"
            morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
            morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
            rotation={[Math.PI / 2, 0, 0]}
            geometry={nodes.mesh_0.geometry}
            
          ><meshNormalMaterial attach="material"
          
         
          
          opacity={1}
          
          reflectivity={1} /></mesh>
        </scene>
      </group>
    )
  }
  
  export default function Birds() {
    return new Array(100).fill().map((_, i) => {
      const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
      const y = -10 + Math.random() * 20
      const z = -5 + Math.random() * 10
      const bird = ['Stork', 'Parrot', 'Flamingo'][Math.round(Math.random() * 2)]
      let speed = bird === 'Stork' ? 0.25 : bird === 'Flamingo' ? 0.5 : 5
      let factor = bird === 'Stork' ? 0.5 + Math.random() : bird === 'Flamingo' ? 0.25 + Math.random() : 1 + Math.random() - 0.5
      return <Bird key={i} position={[x, y, z]} rotation={[0, x > 0 ? Math.PI : 0, 0]} speed={speed} factor={factor} url={`/${bird}.glb`} />
    })
  }