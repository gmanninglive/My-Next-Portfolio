import React, { useEffect } from 'react';
import { motion, useAnimation} from 'framer-motion'
import { useInView } from "react-intersection-observer";

export default function Slide({ children, direction, delay , ...rest}) {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    let start;
    let end = 0;
    if(direction == "left"){
        start = -300;
        }
        else
        start = 300;
        
        
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
  
    return (
      <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 2, delay: delay }}
      variants={{
        visible: { x: end, opacity: 1 },
        hidden: { x: start, opacity: 0 }
      }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }