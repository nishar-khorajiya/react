import React, { useState } from 'react'

export default function TextForm(props) {

    const handleupclick = () => {
        console.log("clicked" + text)
        var newtext = text.toUpperCase()
        settext(newtext)
    }

    const handleonchange = (event) => {
        console.log("changed")
        settext(event.target.value)
    }

    const [text, settext] = useState('Enter text here')

    return (
        <>
            <div className="container">
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" id="mybox" rows="10" value={text} onChange={handleonchange}></textarea>
                    <button className="btn btn-primary my-3" onClick={handleupclick}>convert to uppercase</button>
                </div>
            </div>

            <div className="container my-3">
                <h1>your text summery</h1>
                <p>{text.split(" ").length} words and {text.length} characters</p>
            </div>
        </>
    )
}
