import React, { useEffect, useState } from "react";
import Typewriter from 'typewriter-effect';
import axios from 'axios'
const App = () => {
  const [data, setData] = useState("")
  const [res, setRes] = useState([])
  const [question, setQuestion] = useState("")
  const postData = async (payload) => {
    const response = await axios.post("http://localhost:5000/post", {
      "message": payload
    })
    setRes(response.data.message)
  }

  const onClick = () => {
    setQuestion(data)
    postData(data)
    setData("")
  }
  console.log(res)

  return (
    <>
      {
        question && <div className="question">
          <p>{question}</p>
        </div>
      }

      {
        res.length ? <div className="result">

          <Typewriter
            options={{
              strings: res,
              autoStart: true,
              loop: false,
              delay: 30
            }}
          />
        </div> : ""
      }
      <div className="main-div">

        <div className="input">
          <textarea name="" id="" rows="1" placeholder="Send a message..." value={data} onChange={(e) => setData(e.target.value)} ></textarea>
          <div className="icon" onClick={onClick}>
            <svg stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>

          </div>
        </div>

      </div>
    </>
  )
};

export default App;
