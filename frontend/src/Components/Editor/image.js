import React,{ useRef, useEffect,useState }  from 'react';
import Edit from './Edit';
import './image.css';
import './image.scss';

export default function Image(props) {
   
    return (
        <div className="preview" >
            <Edit profile={props.profile} />
                    
        </div>
    )
}
