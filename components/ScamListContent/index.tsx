import React from "react";
import ScamListItem from "../ScamListItem";
import styles from "./ScamListContent.module.css";

const ScamListContent = (props: any) => {
  const { data } = props;
  return (
    <div className={styles.container}>
      {data.map((item: any, key: any) => (
        <ScamListItem key={key} {...item} />
      ))}
    </div>
  );
};
export default ScamListContent;
