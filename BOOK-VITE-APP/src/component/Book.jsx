import React from 'react'
import './Book.css/'
import { useState } from 'react'
const Book = ({book}) => {
    const [count,setCount]=useState(0);
    function increment(){
        setCount(count+1);
    }
    function decrement(){
        if(count>0)
        setCount(count-1);
    }
    

    function handleAddtoCart(){
        alert(` ${book.title} book added successfully`)
    }
    
  return (
    <div className='card'>
        <img src={book.image} width={200} height={200} alt="" />
        <h3>Title: {book.title}</h3>
        <h4>Price: {book.price}</h4>
        <button style={{width:25}} onClick={decrement}> - </button>
        <span>{count }</span>
        <button style={{width:25}} onClick={increment}>+</button><br/>
        <button onClick={handleAddtoCart}>Add to Cart </button>
    </div>
  )
}

export default Book