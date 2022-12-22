import axios from "axios";
import { useState } from "react";
import styles from "./styles/Home.module.css";
import Logo from "./img/Moralis_logo.png";

function App() {
  const [q, setQ] = useState("");
  const [nfts, setNfts] = useState(null)

  async function getNfts(){
    console.log(q)
    const response = await axios.get("http://localhost:3000/getPalmNfts?getPalmNfts",{
      params: {
        q: q
      }
    })
    console.log(response.data);
    setNfts(response.data)
  }

  function handleChangeSearch(e){
    setQ(e.target.value)
  }


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.moralis_logo}>
          <img src={Logo} alt="logo" width="102" height="82" />
        </div>
        <h1 className={styles.title}>🌴 Find Palm Network NFT's</h1>
      </div>
      <section className={styles.main}>
        <div className={styles.getTokenForm}>
          <input
            className={styles.walletAddress}
            type="text"
            id="searchField"
            name="search_term"
            value={q}
            onChange={handleChangeSearch}
            maxLength="10"
            required
          />
        </div>
        <button className={styles.form_btn} onClick={getNfts}>
          Search NFTs
        </button>
        <div className="results">
          {nfts?.map((e, i)=>{
            return(
              <video controls src={e} key={i} className={styles.nftPreview} />
            )
          })
        }
        </div>
      </section>
    </div>
  );
}

export default App;