"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, MeshPhongMaterialProps } from "@react-three/fiber";
import {
  Physics,
  usePlane,
  useBox,
  Debug,
  PlaneProps,
} from "@react-three/cannon";
import { Mesh } from "three";

type OurPlaneProps = Pick<MeshPhongMaterialProps, "color"> &
  Pick<PlaneProps, "position" | "rotation">;

function Plane({ color, ...props }: OurPlaneProps) {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

function Cube(props: any) {
  const [ref] = useBox(() => ({
    mass: 1000,
    ...props,
    linearDamping: -10,
    args: [2, 2, 2],
    rotation: [0, 0, 0],
  }));

  return (
    <mesh castShadow ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function Cube2(props: any) {
  const [ref] = useBox(() => ({
    mass: 1000, // 物体の質量
    args: [1, 1, 1], // 物体の形状とサイズを定義する引数
    linearDamping: -8, // 物体の線形減衰（速度の減少率）
    ...props,
  }));
  return (
    <mesh castShadow ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function App() {
  const [ready, set] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => set(true), 1000);
    return () => clearTimeout(timeout);
  }, []);
  // 次回　傾きを治す
  return (
    <div className="h-[100vh] w-[100vw]">
      <Canvas camera={{ position: [0, -16, 20], fov: 40 }} shadows>
        <hemisphereLight intensity={0.35 * Math.PI} />
        <spotLight
          angle={0.3}
          castShadow
          decay={0}
          intensity={2 * Math.PI}
          penumbra={1}
          position={[30, 0, 30]}
          shadow-mapSize-width={256}
          shadow-mapSize-height={256}
        />
        <pointLight
          decay={0}
          intensity={0.5 * Math.PI}
          position={[-30, 0, -30]}
        />
        <Physics gravity={[0, 300, -3000]}>
          <Debug scale={1.1} color="red">
            <Plane
              color={"#8B4513"} // SaddleBrown
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
            />
            <Plane
              color={"#A0522D"} // Sienna
              position={[-6, 0, 0]}
              rotation={[0, 0.9, 0]}
            />
            <Plane
              color={"#CD853F"} // Peru
              position={[6, 0, 0]}
              rotation={[0, -0.9, 0]}
            />
            <Plane
              color={"#D2B48C"} // Tan
              position={[0, 6, 0]}
              rotation={[0.9, 0, 0]}
            />
            <Plane
              color={"#DEB887"} // BurlyWood
              position={[0, -6, 0]}
              rotation={[-0.9, 0, 0]}
            />
            <Cube position={[0, 0, 0]} />
            <Cube2 position={[0, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </div>
  );
}
