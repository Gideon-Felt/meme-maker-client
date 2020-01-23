import React, { useState, useEffect, useRef } from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function memeDetail(props) {

    const {id} = props

    const [ meme, setMeme ] = useState({})
    const [imageUrl, setImageUrl] = useState('')

    const [ value, setValue ] = useState('')
    const [ copied, setCopied ] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
          let result = await fetch(`https://gdf-meme-api.herokuapp.com/meme/${id}`)
            .then(res => res.json())
            .then(data => {
                setMeme(data)
                setValue(data.image)
                })
            .catch(err => console.log(err))
        }
        fetchData()
      }, [])

    const copyToClip = () => {
        return(
            <div className="copy-clip-wrapper">
                <CopyToClipboard text={value}
                    onCopy={() => setCopied(true)}>
                    <button className="copy-btn">Share to clipboard</button>
                </CopyToClipboard>
        
                {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
            </div>
        )
    }

    return (
        <div className="meme-detail-wrapper">
            <div className="clipboard-space">
                {copyToClip()}
            </div>
            <div className="img-detail-wrapper">
                <a href={meme.image}><img className="meme-detail-img" src={meme.image} alt="missing meme"/></a>
            </div>
            
            <p className="text-detail-description">{meme.text}</p>
        </div>
    )
}