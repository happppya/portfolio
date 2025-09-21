import * as THREE from 'three'
import React from 'react'
import { RigidBody } from '@react-three/rapier'
import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'

export function Baseplate() {
  const texture_gridGray = useLoader(TextureLoader, '/textures/gridGrayTransparent.png')
  texture_gridGray.wrapS = THREE.RepeatWrapping
  texture_gridGray.wrapT = THREE.RepeatWrapping
  texture_gridGray.repeat.set(256, 256)

  return (
    <RigidBody colliders="trimesh" type="fixed">
      <Cylinder size={[256, 256, 2]} rotation={[0, 0, 0]} position={[0, 0, 0]} color="#87f274" texture={texture_gridGray} />
    </RigidBody>
  )
}

export const Rect = ({ size, ...props }) => (
  <mesh castShadow receiveShadow {...props}>
    <boxGeometry args={size} />
    <meshStandardMaterial color="white" />
  </mesh>
)

export const Sphere = (props) => (
  <RigidBody colliders="ball" restitution={0.7}>
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  </RigidBody>
)

export const Cylinder = ({ size = [1, 1, 1], color = 'white', texture, ...props }) => (
  <mesh castShadow receiveShadow {...props}>
    <cylinderGeometry args={size} />
    <meshStandardMaterial color={color} map={texture} />
  </mesh>
)
