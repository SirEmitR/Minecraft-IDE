import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styles from './cube.module.css'
import { useCompile } from 'context/compileContext'
const Cube = ({values}) => {
  const {color, resist} = values
  const {changeCube, earnDrop, wapon} = useCompile()
  const cubeRef = useRef(null)
  const [presionado, setPresionado] = useState(false);
  const tiempoInicio = useRef(null);
  const presref = new useRef(null)
  function inicioPresionado() {
    setPresionado(true);
    presref.current = true
    tiempoInicio.current = new Date().getTime();
    setTimeout(verificarPresionado, ((resist ? resist * 1000 : 3000)/ wapon?.damage));
  }

  function finPresionado() {
    presref.current = false
    clearTimeout(verificarPresionado);
    if(presionado){
      setPresionado(false);
      
    }
  }
  function verificarPresionado() {
    if(presref.current){
      const tiempoActual = new Date().getTime();
      const tiempoTranscurrido = tiempoActual - tiempoInicio.current;
      if (tiempoTranscurrido >= ((resist ? resist * 1000 : 3000) / wapon?.damage)) {
        if(values?.award){
          const newDrop = {
            id: values?.id,
            porcentage: values?.porcentage,
            awardImage: values?.awardImage
          }
          earnDrop(newDrop)
        }
        changeCube()
      }
    }
  }
    useEffect(() =>{
      const currentRef = cubeRef.current
      const {clientWidth: width, clientHeight: height} = currentRef
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
      scene.add(camera)
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize( width , height );
      currentRef.appendChild(renderer.domElement)
      const textureLoader = new THREE.TextureLoader()
      let material 
      if(values?.style === 'basic'){
        material = new THREE.MeshBasicMaterial({color: color ? color : '#FFF'});
      }else{
        material = new THREE.MeshStandardMaterial({color: '#FFF'});
        const texure = textureLoader.load(`./textures/${values?.texture}`)
        material.map = texure
      }
      
      const controls = new OrbitControls(camera, renderer.domElement);
      const geometry = new THREE.BoxGeometry( 1, 1, 1);
      
      // material.map = lava
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      const ambientalLigth = new THREE.AmbientLight('#FFF', 1)
      scene.add(ambientalLigth)
      camera.position.z = 2;
      camera.lookAt(cube.position)
      function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }
      animate();
      return () =>{
        currentRef.removeChild(renderer.domElement)
      }
    }, [color, values?.style, values?.texture])
  return (
    <div ref={cubeRef} className={`${styles.cube} ${presionado && styles.press}`} onMouseDown={e => inicioPresionado()} onMouseUp={e => finPresionado()}>
    </div>
  )
}

export default Cube