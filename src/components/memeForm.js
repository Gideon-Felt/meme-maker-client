import React, { useState, useEffect, useRef } from "react"
import DropzoneComponent from "react-dropzone-component"
import request from "superagent"
import axios from "axios"
import { navigate } from "hookrouter"

import "../../node_modules/react-dropzone-component/styles/filepicker.css"
import "../../node_modules/dropzone/dist/min/dropzone.min.css"

import favoriteStar from "../../static/assets/star.png"
import blackStar from "../../static/assets/black.png"

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
            iconFiletypes: [".jpg", ".png", ".gif"],
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

    const handleFavoriteClick = () => {
        setFavorite(!favorite)
    }

    return (
        <div>
            <div className="form-mode-wrapper">
                {props.editMode ?
                <h1 className="form-mode"> Edit Meme</h1>
                :
                <h1 className="form-mode">Add a Meme</h1>
                }
            </div>
            <form onSubmit={handleSubmit} className="form-body">
                <div className="drop-component">
                    <DropzoneComponent
                    ref={imageRef}
                    config={componentConfig()}
                    djsConfig={djsConfig()}
                    eventHandlers={handleDrop()}
                    >
                        <p className="dropzone-message">Drop Yo' Meme</p>
                    </DropzoneComponent>
                </div>
                <div className="caption-input">
                    <input
                        className="input-element"
                        type="text"
                        placeholder="Caption"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </div>
                
                <div className="user-input-space">
                    <div className="inputs">

                        <div className="star-space">

                            <div onClick={() => handleFavoriteClick()}>
                                {favorite ? <img className="favorite-star" style={{height: "28px", width: "28px"}} src={favoriteStar} alt="Favorite star missing"/> : <img className="favorite-star" style={{height: "28px", width: "28px"}} src={blackStar} alt="Favorite star missing"/>}
                            </div>

                            <div className="spacer1"/>

                            <span className="favorite">Favorite?</span>

                        </div>

                        <button className="submit-btn" type="submit">save meme</button>
                        
                    </div>
                    
                </div>
            </form>

        </div>
    )
}

export default MemeForm