import React,{useRef,useEffect,useState} from 'react';

import './Edit.css';
import './Edit.scss';




function Edit(props){
  
  let ctx = null;
  const canvas = useRef();
  
  const [xval,setX] = useState(0);
  const [yval,setY] = useState(0);
  const [r,setr] = useState(null);
  const [array,setarray] = useState([]);

 
  useEffect(() => {
   
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current

    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    ctx = canvasEle.getContext("2d");
    console.log(ctx)
    
    setr(ctx)
    // get context of the canvas
    
  }, []);

  const [draw,setdraw] = useState(false);
  

 

 
  // draw rectangle
  const drawRect = (e,style={}) => {

    
   
    let rectw = ((e.pageX - e.nativeEvent.path[0].offsetLeft) - xval);
    let recth = ((e.pageY - e.nativeEvent.path[0].offsetTop) - yval);
    const { borderColor = 'black', borderWidth = 2 } = style;
    r.clearRect(0,0,1200,700);
    
    let data = {"x":xval,"y":yval,"w":rectw,"h":recth};
    
    setarray(array=> [...array,data]);
    
    r.strokeStyle = borderColor
    r.lineWidth = borderWidth
    r.beginPath();
    array.map(item =>{
      return (
      r.rect(item.x,item.y,item.w,item.h)
      )
    })
   
   
    console.log(array);
    r.stroke();
    r.closePath();
    
   
    
  }
  const moveRect = (r) =>(e,style={}) =>{
    
    if(draw){
      
      let rectw = ((e.pageX - e.nativeEvent.path[0].offsetLeft) - xval);
      let recth = ((e.pageY - e.nativeEvent.path[0].offsetTop) - yval);
      const { borderColor = 'black', borderWidth = 2 } = style;
      r.clearRect(0,0,700,700);
     
      r.strokeStyle = borderColor
      r.lineWidth = borderWidth
      r.beginPath();
     
      r.rect(xval,yval,rectw,recth);
      console.log(xval,yval,rectw,recth);
      r.stroke();
    } 
  }

  const init =(e) =>{
    
    setX(e.pageX - e.nativeEvent.path[0].offsetLeft);
    setY(e.pageY - e.nativeEvent.path[0].offsetTop);
    console.log(e,xval,yval,r)
    setdraw(true);
    
    

  }
 
  const endit = (e) => {
    r.closePath();
    setdraw(false);
    drawRect(e);
    
  }
  // draw rectangle with background
  
  

  return(
    <div className="edit" >
        <img src={props.profile} />
      
        <canvas className="canvas" ref={canvas} onMouseMove={(e)=>{moveRect(r)(e)}} onMouseDown={(e)=>init(e)} onMouseUp={(e)=>{endit(e)}}></canvas>


    
      
    
    </div>

  )

}


export default Edit;