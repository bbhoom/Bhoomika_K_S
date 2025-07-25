import React from 'react'
import { Float, useGLTF } from '@react-three/drei'

const ReactLogo = (props) => {
    const { nodes, materials } = useGLTF('https://bbhoom.github.io/Bhoomika_K_S/models/react.glb')
    return (
        <Float floatIntensity={1}>
            <group position={[8, 8, 0]} scale={0.2} {...props} ispose={null} >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['React-Logo_Material002_0'].geometry}
                    material={materials['Material.002']}
                    rotation={[0, 0, -Math.PI / 2]}
                    scale={[0.39, 0.39, 0.5]}
                />
            </group>
        </Float>
    )
}

useGLTF.preload('/Bhoomika_K_S/models/react.glb')
export default ReactLogo
