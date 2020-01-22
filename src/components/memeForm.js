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

    useEffect(() => {
        if (props.id && props.editMode) {
            fetch(`https://gdf-meme-api.herokuapp.com/meme/${props.id}`)
            .then(res => res.json())
            .then(data => {
                setText(data.text)
                setFavorite(data.favorite)
            })
            .catch(err => {
                console.log("load meme data error:", err)
            })
        }
    }, [])


    const componentConfig = () => {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    const djsConfig = () => {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    const handleDrop = () => {
        return {
            addedfile: file => {
                let upload = request
                    .post("https://api.cloudinary.com/v1_1/gdfelt/image/upload")
                    .field("upload_preset", "meme-images")
                    .field("file", file)
                upload.end((err, res) => {
                    if (err) {
                        console.log("Cloudinary error", err)
                    }
                    if (res.body.secure_url !== "") {
                        setImage(res.body.secure_url)
                    }
                })
            }
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (props.editMode) {
            fetch(`https://gdf-meme-api.herokuapp.com/meme/${props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    text,
                    favorite
                })
            })
            .then(() => {
                setText("")
                setFavorite(false)
                imageRef.current.dropzone.removeAllFiles()
                navigate("/")
            })
            .catch(err => console.log("PUT error: ", err))
        } else {
            axios
            .post("https://gdf-meme-api.herokuapp.com/add-meme", {
                text,
                image,
                favorite
            })
            .then(() => {
                setText("")
                setImage("")
                setFavorite(false)
                imageRef.current.dropzone.removeAllFiles()
            })
            .then(() => {
                console.log("added")
                navigate("/")
            })
            .catch(err => {
                console.log("New Meme Submit Error: ", err)
            })
        }
    }

    return (
        <div>
            {props.editMode ?
            <h1> Edit Meme</h1>
            :
            <h1>Add a Meme</h1>
            }
            <form onSubmit={handleSubmit}>
                <DropzoneComponent
                ref={imageRef}
                config={componentConfig()}
                djsConfig={djsConfig()}
                eventHandlers={handleDrop()}
                >
                    Drop Yo' Meme Cuzzn
                </DropzoneComponent>
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