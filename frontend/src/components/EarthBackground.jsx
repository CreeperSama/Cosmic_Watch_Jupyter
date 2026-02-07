import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const Earth = () => {
  const earthRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime / 12; // Even slower for elegance
    }
  });

  return (
    <mesh ref={earthRef} scale={[2.0, 2.0, 2.0]}> 
      {/* OPTIMIZATION: Reduced segments from 64 to 32 */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#0A84FF"
        emissive="#0A84FF"
        emissiveIntensity={0.2} 
        wireframe={true}
        transparent
        opacity={0.15} 
      />
    </mesh>
  );
};

const AsteroidBelt = ({ count = 300 }) => {
  const mesh = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 25; 
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 25;
      temp.push({ t, speed, x, y, z });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      particle.t += particle.speed;
      dummy.position.set(
        particle.x + Math.cos(particle.t),
        particle.y + Math.sin(particle.t),
        particle.z
      );
      dummy.rotation.x = particle.t * 0.5;
      const scale = 0.05 + Math.random() * 0.1; 
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.4, 0]} /> 
      <meshStandardMaterial color="#A9A9A9" transparent opacity={0.8} />
    </instancedMesh>
  );
};

const EarthBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: false }}> 
        {/* OPTIMIZATION: antialias: false makes it much faster */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0A84FF" />
        
        <group position={[0, 0, 0]}> 
          <Earth />
        </group>
        
        <AsteroidBelt />
        {/* OPTIMIZATION: Reduced star count */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default EarthBackground;