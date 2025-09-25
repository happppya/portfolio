import { useRef } from 'react'
import { RigidBody } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePersonControls } from './Controls.jsx'

export function Player() {
  const ref = useRef()
  const velocity = new THREE.Vector3()
  const speed = 12
  const jumpPower = 1
  const canJump = useRef(false)

  const { forward, backward, left, right, jump } = usePersonControls()

  useFrame(() => {
    const body = ref.current
    if (!body) return

    const targetVelocity = new THREE.Vector3()

    if (forward) targetVelocity.z -= speed
    if (backward) targetVelocity.z += speed
    if (left) targetVelocity.x -= speed
    if (right) targetVelocity.x += speed

    const currentVelocity = body.linvel()

    const accel = 0.2
    const newVelX = THREE.MathUtils.lerp(currentVelocity.x, targetVelocity.x, accel)
    const newVelZ = THREE.MathUtils.lerp(currentVelocity.z, targetVelocity.z, accel)

    body.setLinvel({ x: newVelX, y: currentVelocity.y, z: newVelZ })

    // jump
    const pos = body.translation()
    if (jump && canJump.current) {
      body.applyImpulse({ x: 0, y: jumpPower, z: 0 })
      canJump.current = false
    }

    // ground check
    if (pos.y <= 5) canJump.current = true
  })

  return (
    <RigidBody ref={ref} type="dynamic" colliders="cuboid" mass={1} restitution={0} friction={0} position={[0, 10, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  )
}
