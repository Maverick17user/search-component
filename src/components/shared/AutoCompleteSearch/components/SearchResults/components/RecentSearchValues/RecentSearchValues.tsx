import { memo } from "react";
import { IRecentSearchValues } from "./types";
import styles from "./RecentSearchValues.module.css";

const RecentSearchValues = memo(
  ({
    title = "Recently searched values",
    memorizedSearchedValues,
  }: IRecentSearchValues) => {
    return (
      <div className={styles.recentSearchValues}>
        <h3 className={styles.recentSearchValues__title}>{title}</h3>
        <ul className={styles.recentSearchValues__list}>
          {memorizedSearchedValues.map((recentSearchedValue) => (
            <li
              key={recentSearchedValue}
              className={styles.recentSearchValues__list_item}
            >
              {recentSearchedValue}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default RecentSearchValues;
