import React, { useEffect, useRef } from 'react'
import styles from './compile.module.css'
const Compile = () => {
    const compile = useRef()
    useEffect(() =>{
        const particles = document.getElementsByClassName(styles.particles)
        const colors = ["rgba(0,0,0, 1)", "rgba(0,0,0, 0.5)", "rgba(0,0,0, 0.2)"];
        let balls = []
        for(let i = 0; i < 50; i++){
            let ball = document.createElement("div");
            ball.classList.add(styles.particles);
            ball.style.background = colors[Math.floor(Math.random() * colors.length)];
            ball.style.left = `${Math.floor(Math.random() * 100)}%`;
            ball.style.bottom = `${Math.floor(Math.random() * 100)}%`;
            ball.style.transform = `scale(${Math.random()})`;
            ball.style.width = `${Math.random()* 10}px`;
            ball.style.height = ball.style.width;
            balls.push(ball);
            compile.current.append(ball)
        }

        balls.forEach((el, i, ra) => {
            let to = {
                x: Math.random() * (i % 2 === 0 ? -11 : 11),
                y: Math.random() * 5
            };
    
            let anim = el.animate(
                [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
                ],
                {
                duration: (Math.random() + 1) * 2000,
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
                }
            );
            });
    }, [])
  return (
    <div className={styles.compile} ref={compile}>
        <div className={styles.lava}>
        </div>
        <div className={styles.loading}>
        </div>
    </div>
  )
}

export default Compile