import Head from 'next/head'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from "axios"
import { CoinGeckoClient } from 'coingecko-api-v3';

export default function Home() {
  const [globalHash, setGlobalHash] = useState(100000);
  const [dailyPool, setDailyPool] = useState(204972);
  const [userHash, setUserHash] = useState(55);
  const [userReward, setUserReward] = useState(0);
  const [epwPriceUsd, setEpwPriceUsd] = useState(0);
  const [epwPriceBrl, setEpwPriceBrl] = useState(0);

  const apiUsd = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/simple/price?ids=Evoverse-Power&vs_currencies=usd",
  });
  const apiBrl = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/simple/price?ids=Evoverse-Power&vs_currencies=brl",
  });
  useEffect(() => {
    setUserReward((dailyPool / globalHash) * userHash)
  }, [globalHash, dailyPool, userHash, userReward])


  useEffect(() => {
    apiUsd
      .get()
      .then(
        (response) => {
          console.log(response.data)
          //const stringData = JSON.stringify(response.data);
          setEpwPriceUsd(response.data["evoverse-power"]["usd"])
        }
      )
      .catch((err) => {
        console.error("ops! ocorreu um erro ao carregar o valor da moeda" + err);
        setEpwPriceUsd(0.0)
      });
  }, [epwPriceUsd]);

  useEffect(() => {
    apiBrl
      .get()
      .then(
        (response) => {
          console.log(response.data)
          //const stringData = JSON.stringify(response.data);
          setEpwPriceBrl(response.data["evoverse-power"]["brl"])
        }
      )
      .catch((err) => {
        console.error("ops! ocorreu um erro ao carregar o valor da moeda" + err);
        setEpwPriceBrl(0.0)
      });
  }, [epwPriceBrl]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="EVOVERSE Calculator" />
        <link rel="icon" href="/iconPod.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{
          flex: 1,
          backgroundSize: 'cover',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 className={[styles.title]}>
            EVOVERSE PROFIT CALC
          </h1>

          <p className={styles.description}>
            Insira os valores encontrados na tela de mineração para calcular seus ganhos
          </p>
          <div className={[styles.grid]}>
            <a className={[styles.card]}>
              <h2>Preço EPW</h2>
              <p>
                {parseFloat(epwPriceUsd).toFixed(3)} USD
              </p>
              <p>
                {parseFloat(epwPriceBrl).toFixed(3)} BRL
              </p>
            </a>
          </div>

          <div className={[styles.grid]}>
            <a className={[styles.card]}>
              <h2>Mining Daily Pool:</h2>
              <input style={{ fontSize: 20, maxWidth: '100%' }} value={dailyPool} onInput={e => setSetDailyPool(e.target.value)} />
            </a>

            <a className={styles.card}>
              <h2 >Estimated Global HashPower:</h2>
              <input style={{ fontSize: 20, maxWidth: '100%' }} value={globalHash} onInput={e => setGlobalHash(e.target.value)} />
            </a>

            <a
              className={styles.card}
            >
              <h2>Seu HashPower:</h2>
              <input style={{ fontSize: 20, maxWidth: '100%' }} value={userHash} onInput={e => setUserHash(e.target.value)} />
            </a>

            <a
              className={styles.card}
            >
              <h2>Recompensa Estimada:</h2>
              <p>
                {parseFloat(userReward).toFixed(1)} EPW/Dia
              </p>
              <p>
                {parseFloat(userReward * 15).toFixed(1)} EPW/Saque
              </p>
              <p>
                {parseFloat(userReward * 30).toFixed(1)} EPW/Mês
              </p>
              <hr style={{ width: "100%" }} />
              <p>
                {parseFloat(userReward * epwPriceUsd).toFixed(1)} USD/Dia
              </p>
              <p>
                {parseFloat(userReward * epwPriceUsd * 15).toFixed(1)} USD/Saque
              </p>
              <p>
                {parseFloat(userReward * epwPriceUsd * 30).toFixed(1)} USD/Mês
              </p>
              <hr style={{ width: "100%" }} />
              <p>
                {parseFloat(userReward * epwPriceBrl).toFixed(1)} BRL/Dia
              </p>
              <p>
                {parseFloat(userReward * epwPriceBrl * 15).toFixed(1)} BRL/Saque
              </p>
              <p>
                {parseFloat(userReward * epwPriceBrl * 30).toFixed(1)} BRL/Mês
              </p>
            </a>
          </div>
          {/*<div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
  </div>*/}
        </div>
      </main>

      {/*<footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>*/}
    </div>
  )
}
