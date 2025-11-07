import React from 'react'
import Book from './component/Book'
import './App.css'

export const App = () => {
  const books = [
    { image: "https://m.media-amazon.com/images/I/31WIiECCtxL._AC_UF1000,1000_QL80_.jpg", title: "Physics", price: "₹341" },
    { image: "https://m.media-amazon.com/images/I/51-uPEZKHsL._AC_UF1000,1000_QL80_.jpg", title: "Chemistry", price: "₹501" },
    { image: "https://m.media-amazon.com/images/I/91oCkbtq1CL.jpg", title: "Maths", price: "₹800" }
  ]
  return (
    <div className='app'>
      {
        books.map((b, i) => (
          <Book key={i} book={b} />
        ))
        
      }
    </div>
  )
}



export default App;

