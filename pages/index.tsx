import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ScamListContent from "../components/ScamListContent";
import DummyData from "./api/dummy-data.json";

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // try {
    //   fetch("./api/dataaa")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setData(data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // Will uncomment later once API ready.
    setData(DummyData);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Solana Safety 101</title>
        <meta name="description" content="Community maintained phishing and scams list." />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      </Head>
      <header className={styles.header}>
        <img src="/solana-logo.png" alt="" />
        <h1>Safety 101</h1>
      </header>
      <main className={styles.main}>
        <ScamListContent data={data} />
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img src="/grape-logo.png" alt="" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
