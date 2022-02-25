import axios from "axios";
import React, { useEffect, useState } from "react";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemesImage, setAllMemesImage] = useState([]);
  const getMemeImage = () => {
    const randomMeme = Math.floor(Math.random() * allMemesImage.length);
    const url = allMemesImage[randomMeme].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((res) => {
        setAllMemesImage(res.data.data.memes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <div className='form'>
        <input
          placeholder='Top-Text'
          type='text'
          className='form-input'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          placeholder='Bottom-Text'
          type='text'
          className='form-input'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className='form-button' onClick={() => getMemeImage()}>
          Get a Image
        </button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} className='meme-image' />
        <h2 className='meme-text top'>{meme.topText}</h2>
        <h2 className='meme-text bottom'>{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
