import React from "react";
import favoriteStar from "../../static/assets/star.png"

function Meme(props) {
    const {id, text, favorite, image } = props.meme

    

    return (
        <div className="meme">
            <div className="img-wrapper">
                <a href={image}><img className="meme-img" src={image} alt="missing meme"/></a>
            </div>

            <p className="text-description">{text}</p>
            <div className="meme-interface">
                {favorite ? <img className="favorite" style={{height: "40px", width: "40px"}} src={favoriteStar} alt="Favorite star missing"/> : null}
                
                <div className="delete-btn">
                    <button className="btn" onClick={() => props.deleteMeme(id)}>Delete</button>
                </div>
                <div className="edit-btn">
                    <button className="btn" onClick={() => props.editMeme(id)}>Edit</button>
                </div>

                <div className="detail-btn">
                    <button className="btn" onClick={() => props.detailMeme(id)}>Share</button>
                </div>
                
            </div>
            
        </div>
    )
}

export default Meme