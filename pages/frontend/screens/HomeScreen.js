import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/screens/HomeScreen.module.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "100",
  subsets: ["latin"],
});

function HomeScreen() {
  let divRefOne = useRef(null);
  let divRefTwo = useRef(null);

  const clickHandler1 = () => {
    divRefOne.current &&
      divRefOne.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const clickHandler2 = () => {
    divRefTwo.current &&
      divRefTwo.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };
  return (
    <div className={styles.App}>
      <main className={styles.main}>
        <div
          ref={divRefTwo}
          className={[styles.wholeHeightDiv, "div1"].join(" ")}
        >
          <Image
            className={styles.blurredImage}
            fill
            src="/assets/images/homepagebackground.png"
            alt="hpbg"
          />
          <div className={[roboto.className, styles.divOneContent].join(" ")}>
            <h1 className={styles.textHeading}>Ink-Link</h1>
            <h1 className={styles.textOne}>We back the writers of</h1>
            <h1 className={styles.textOne}>the future.</h1>
            <div className={styles.divButtons}>
              <button className={styles.getStarted}>Get Started</button>
              <div onClick={clickHandler1} className={styles.nextButton}>
                next
              </div>
            </div>
          </div>
        </div>

        <div
          className={[styles.wholeHeightDivTwo, "div2"].join(" ")}
          ref={divRefOne}
        >
          {/* <Image
            className={styles.blurredImage}
            fill
            src="/assets/images/homepagebackground.png"
            alt="hpbg"
          /> */}
          <div className={[roboto.className, styles.divOneContent].join(" ")}>
            <h1 className={styles.subtextHeading}>
              The ultimate platform for freelancers, clients, and agencies to
              connect, collaborate, and create!
            </h1>
            <div className={styles.cardHolder}>
              <div className={styles.card}>
                <Image
                  width={150}
                  height={150}
                  src="/assets/images/clientImage.webp"
                  alt="client pic"
                />
                <h2 className={styles.cardTitle}>Clients</h2>
                <p className={styles.cardText}>
                  Find the perfect writer for your project
                </p>
                <button className={styles.learnMore}>Learn More</button>
              </div>
              <div className={styles.card}>
                <Image
                  width={150}
                  height={150}
                  src="/assets/images/agency.png"
                  alt="agency pic"
                />
                <h2 className={styles.cardTitle}>Agencies</h2>
                <p className={styles.cardText}>Build your dream writing team</p>
                <button className={styles.learnMore}>Learn More</button>
              </div>
              <div className={styles.card}>
                <Image
                  width={150}
                  height={150}
                  src="/assets/images/freelancer.png"
                  alt="freelancer pic"
                />
                <h2 className={styles.cardTitle}>Freelancers</h2>
                <p className={styles.cardText}>
                  Discover your next writing gig
                </p>
                <button className={styles.learnMore}>Learn More</button>
              </div>
              <div onClick={clickHandler2} className={styles.nextButton}>
                previous
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <footer className={styles.footer}>
        <p>&copy; InkLink 2023</p>
      </footer> */}
    </div>
  );
}

export default HomeScreen;
