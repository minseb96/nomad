import { useEffect, useState } from "react";
import { logDOM } from "@testing-library/react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myCoins, setMyCoins] = useState([]);
  const [myMoney, setMyMoney] = useState("");
  const [myCoinCount, setMyCoinCount] = useState(0);

  console.log("rendered");
  //only once
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (myMoney) {
      setLoading(false);
      setMyCoins(coins.filter((coin) => coin.quotes.USD.price < myMoney));
      setMyCoinCount(
        coins.filter((coin) => coin.quotes.USD.price < myMoney).length
      );
    }
  }, [myMoney]);

  const onChange = (event) => {
    setLoading(true);
    setMyMoney(event.target.value);
  };

  return (
    <div>
      <h1>The Coins! ({myMoney ? myCoinCount : coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <input
        type="number"
        placeholder="insert your money"
        value={myMoney}
        onChange={onChange}
      />
      <ul>
        {myMoney
          ? myCoins?.map((coin) => (
              <li key={coin.id}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price * 0.000033}{" "}
                BTC
              </li>
            ))
          : coins?.map((coin) => (
              <li key={coin.id}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price * 0.000033}{" "}
                BTC
              </li>
            ))}
      </ul>
    </div>
  );
}

export default App;
