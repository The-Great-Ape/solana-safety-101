import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import classNames from "classnames";
import styles from "../styles/Home.module.css";

import ListHeader from "../components/ListHeader";
import ListContent from "../components/ListContent";
import Data from "./api/data.json";

const Home: NextPage = () => {
  // const [data, setData] = useState(Array());
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //   // 1st approach
  //   try {
  //     fetch("./api/data")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // 2nd approach
  //   setTimeout(() => {
  //     setData(Data);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  const [data, setData] = useState(Data);
  const [isLoading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Solana Safety 101</title>
        <meta name="description" content="Community maintained phishing and scams list to for safety and delightful Solana experience." />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Community maintained phishing and scams list to for safety and delightful Solana experience." />
        <meta property="og:url" content="https://safety.grapes.network/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Solana Safety 101" />
        <meta property="og:description" content="Community maintained phishing and scams list to for safety and delightful Solana experience." />
        <meta property="og:image" itemProp="image" content="https://safety.grapes.network/og-image.png" />
        <meta property="og:image:secure_url" content="https://safety.grapes.network/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@grapeprotocol" />
        <meta name="twitter:creator" content="@grapeprotocol" />
        <meta name="twitter:url" content="https://safety.grapes.network/" />
        <meta name="twitter:title" content="Solana Safety 101" />
        <meta name="twitter:description" content="Community maintained phishing and scams list to for safety and delightful Solana experience." />
        <meta name="twitter:image" content="https://safety.grapes.network/og-image.png" />
      </Head>
      <a href="https://github.com/The-Great-Ape/solana-safety-101" target="_blank" className={styles.forkMe} rel="noreferrer">
        <img loading="lazy" width="129" height="129" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" className="right-0 absolute top-0 max-w-full" alt="Fork me on GitHub" data-recalc-dims="1" />
      </a>
      <header className={styles.header}>
        <div className={classNames(styles.imageContainer, styles.headerImage)}>
          <img src="/solana-logo.png" alt="Solana Logo" />
        </div>
        <h1>Safety 101</h1>
      </header>
      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        ) : (
          <ListContent data={data} />
        )}
      </main>

      <footer className={styles.footer}>
        <a href="https://grapes.network/" target="_blank" rel="noreferrer">
          <div className={classNames(styles.imageContainer, styles.footerImage)}>
            <img src="/grape-logo.png" alt="Grape Logo" />
          </div>
        </a>
      </footer>
    </div>
  );
};

export default Home;
