import React from "react";
import * as htmlToImage from "html-to-image";

// Icons
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

export default function Meme() {
    // Memes Data
    const [allMemeImages, setAllMemeImages] = React.useState([]);
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((resp) => resp.json())
            .then((data) => setAllMemeImages(data));
    }, []);

    // Meme Image State
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });

    // Update Text
    function handleChange(e) {
        const { name, value } = e.target;

        setMeme((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // New Meme Image Button
    function newMemeData() {
        const memesArr = allMemeImages.data.memes;
        const randomNum = Math.floor(Math.random() * memesArr.length);
        const url = memesArr[randomNum].url;

        // Update State
        setMeme((prevState) => {
            return {
                ...prevState,
                randomImage: url,
            };
        });
    }

    // To capture the image
    function capture() {
        htmlToImage
            .toPng(document.querySelector(".meme"), { quality: 1 })
            .then(function (data) {
                console.log(data);
                let link = document.createElement("a");
                link.download = "meme.png";
                link.href = data;
                link.click();
            });
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top Text"
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom Text"
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                />
                <button
                    className="submit-btn"
                    type="submit"
                    onClick={newMemeData}
                >
                    New Meme Image <SportsEsportsIcon sx={{ fontSize: 16 }} />
                </button>
                <button className="saveMeme-btn" onClick={capture}>
                    Save Meme
                </button>
            </div>

            <div className="meme">
                <img src={meme.randomImage} alt="meme" className="meme-image" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}