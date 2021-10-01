import * as THREE from "three";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useTexture, CurveModifier } from "@react-three/drei";

export default function Curved({
  text,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
  ...props
}) {
  const texture = useTexture("/textures/NormalMap.png");
  const font = useLoader(THREE.FontLoader, "/InterB2.json");
  const curveRef = useRef();
  const curve = React.useMemo(
    () => new THREE.CatmullRomCurve3(0, true, "centripetal"),
    []
  );
  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 2,
    }),
    [font]
  );
//   const mesh = useRef();
//   useLayoutEffect(() => {
//     const size = new THREE.Vector3();
//     mesh.current.geometry.computeBoundingBox();
//     mesh.current.geometry.boundingBox.getSize(size);
//     mesh.current.position.x =
//       hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
//     mesh.current.position.y =
//       vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
//   }, [text]);

  

  return (
    <group {...props} scale={[1 * size, 1 * size, 1]}>
      <CurveModifier ref={curveRef} curve={curve}>
          <mesh ref={mesh}>
            <textGeometry args={[text, config]} />
            <meshNormalMaterial
            metalness={1}
            roughness={0.2}
            normalMap={texture}
            color="hotpink"
            reflectivity={1}
            />
      </mesh>
      </CurveModifier>
    </group>
  );
}
