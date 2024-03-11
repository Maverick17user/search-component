import { IShowAllButton } from "./types";
import styles from "./ShowAllButton.module.css";
import { memo } from "react";

const ShowAllButton = memo(({ showAll }: IShowAllButton) => {
  return (
    <button
      type="button"
      onClick={showAll}
      className={styles.showAllButton}
      aria-expanded="false"
    >
      Show all search results
    </button>
  );
});

export default ShowAllButton;
