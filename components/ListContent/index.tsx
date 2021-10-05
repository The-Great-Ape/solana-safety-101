import React from "react";
import styles from "./index.module.css";
import ListItem from "../ListItem";
import ListHeader from "../ListHeader";

const ListContent = (props: any) => {
  const { data } = props;
  return (
    <>
      <div className={styles.headerContainer}>
        <ListHeader />
        <ListHeader />
        <ListHeader />
      </div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          {data.map((items: any, key: any) => (
            <div key={key} className={styles.groupContainer}>
              {items.map((item: any, key: any) => (
                <ListItem key={key} {...item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ListContent;
