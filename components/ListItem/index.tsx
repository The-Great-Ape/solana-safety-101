import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";

const ListItem = (props: any) => {
  const { domain, status, spacing } = props;
  return (
    <div
      className={classNames(styles.container, {
        [styles.isScam]: status === "Scam" && true,
      })}
    >
      <div className={styles.innerContainer}>
        {spacing ? (
          <>&nbsp;</>
        ) : (
          <>
            <div className={styles.domain}>{domain}</div>
            <div className={styles.status}>{status}</div>
          </>
        )}
      </div>
    </div>
  );
};
export default ListItem;
