import React from 'react'
import { useState } from'react'
import './FlowForm.css' 
function FlowForm() {


 
      const [selected, setSelected] = useState(null);
    
      const handleSelect = (index) => {
        setSelected(index);
      };
  return (
    <div>
        <form>
            <label className='Flow-input'>
                <input type="text" placeholder="Enter your text" />
                <button type="submit"><img src='send.png'></img></button>
            </label>
            <label className='Flow-input'>
                <input type='num' placeholder="Enter a number" />
                <button type="submit"><img src='send.png'></img></button>
            </label >
            <label className='Flow-input'>
                <input type="email" placeholder="Enter your email" />
                <button type="submit"><img src='send.png'></img></button>
            </label>
            <label className='Flow-input'>
                <input type="tel" placeholder="Enter your phone" />
                <button type="submit"><img src='send.png'></img></button>
            </label>
            <label className="Flow-input">
  <input
    type="text"
    onFocus={(e) => (e.target.type = 'date')}
    onBlur={(e) => (e.target.type = 'text')}
    placeholder="Select a date"
  ></input>
  <button type="submit">
    <img src="send.png" alt="Send"></img>
  </button>
</label>

<label className="Flow-input"><button></button></label>


                
             <div className="Flow-input">
      {[1, 2, 3, 4, 5].map((item, index) => (
        <div
          key={index}
          className={`circle ${selected === index ? "selected" : ""}`}
          onClick={() => handleSelect(index)}
        >
          {item}
        </div> 
      ))} <button className="FlowRating"><img src="send.png"></img></button>
    </div>
        </form>
    </div>
  )
}

export default FlowForm