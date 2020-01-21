import React from "react";
import favoriteStar from "../../static/assets/star.png"

function Meme(props) {
    const {id, text, favorite, image } = props.meme
    return (
        <div className="meme">
            <div className="img-wrapper">
                <img className="meme-img" src={image} alt="missing meme" />
            </div>

            <p className="text-description">{text}</p>
            <div className="meme-interface">
                {favorite ? <img className="favorite" style={{height: "40px", width: "40px"}} src={favoriteStar} alt="Favorite star missing"/> : null}
                <button className="btn" onClick={() => props.deleteMeme(id)}>Delete</button>
                <button className="btn">Edit</button>
            </div>
            
        </div>
    )
}

export default Meme