import { forwardRef, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

export function PlayerCamera(playerRef) {
  const { camera } = useThree()
  const target = new Vector3()

  useFrame(() => {
    if (!playerRef.current) return

    // Get player position
    playerRef.current.getWorldPosition(target)

    // Desired camera position relative to player
    camera.position.lerp(
      target.clone().add(new Vector3(...offset)),
      0.1, // smooth interpolation
    )

    // Always look at the player
    camera.lookAt(target)
  })

  return null
}
