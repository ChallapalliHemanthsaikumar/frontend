 import React,{useEffect,useState} from 'react'

// export default function Edit({profile}) {
//     const [x, setX] = useState(0)
//     const [y, setY] = useState(0)
//     return (
//         <div>
//             <img  className src={profile} style={{cursor:"crosshair"}}/>
//         </div>
//     )
// }

class Edit extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }
    array = [{}];
    _onMouseMove(e) {
      this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
     
    
    }
   saveCoordinate(e){
        console.log("hello",e)
        if(e.buttons === 1){
        this.array.push({x:this.state.x,y:this.state.y})
        console.log(this.array);
        }

    }
    render() {
      const { x, y } = this.state;
      return <div>
        
          <img onMouseDown={this.saveCoordinate.bind(this)} onMouseMove={this._onMouseMove.bind(this)}  src={this.props.profile}  style={{cursor:"crosshair"}} />
        
        <h1 style={{color:"red"}}>{ x } { y }</h1><br/>
      </div>;
    }
  }
  
  /*
   * Render the above component into the div#app
   */
 export default Edit;