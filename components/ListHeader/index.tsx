import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";

const ListItem = (props: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.domain}>Domain Name</div>
        <div className={styles.status}>
          Real <span className={styles.isScam}>or Scam</span>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
