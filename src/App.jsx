import { use, useEffect, useState } from "react";

function App() {
  const [gifs, setGifs] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    getGIFs();
  }, []);

  async function getGIFs() {
    try {
      const response = await fetch(
        "https://api.giphy.com/v1/gifs/trending?api_key=0OHNgILk3xR3sfzYvy43w8TbipHVqRaI&limit=12"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch GIFs");
      }

      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function shuffleArray() {
    const nextOrder = [...gifs];
    for (let i = nextOrder.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = nextOrder[i];
      nextOrder[i] = nextOrder[j];
      nextOrder[j] = k;
    }
    setGifs(nextOrder);
  }

  return (
    <>
      <div>
        <div>
          <h1>Memory Test</h1>
          <p>
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
        <div>
          <p>Score: 0</p>
          <p>Your Highscore: 0</p>
        </div>
      </div>
      <div>
        {gifs.map((gif) => (
          <button>
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              onClick={shuffleArray}
            />
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
