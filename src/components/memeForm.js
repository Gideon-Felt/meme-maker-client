import React, { useState, useEffect, useRef } from "react"
import DropzoneComponent from "react-dropzone-component"
import request from "superagent"
import axios from "axios"
import { navigate } from "hookrouter"

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"

function MemeForm(props) {
    const [ text, setText ] = useState("")
    const [ favorite, setFavorite ] = useState(false)
    const [ image, setImage ] = useState("")
    const imageRef = useRef(null)

    return (
        <div>
            {props.editMode ?
            <h1> Edit Meme</h1>
            :
            <h1>Add a Meme</h1>
            }
            <form>
                <input
                type="text"
                placeholder="Caption"
                value={text}
                onChange={e => setText(e.target.value)}
                />
                <div>
                    <input
                    type="checkbox"
                    checked={favorite}
                    onChange={() => setFavorite(!favorite)}
                    />
                    <span>Favorite?</span>
                </div>
                <button type="submit">save meme</button>
            </form>

        </div>
    )
}

export default MemeForm