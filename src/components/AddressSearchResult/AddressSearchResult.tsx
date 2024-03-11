import { memo } from "react";
import { IAddressSearchResult } from "./types";
import styles from "./AddressSearchResult.module.css";

const AddressSearchResult = memo(({ result }: IAddressSearchResult) => {
  return (
    <li
      aria-description="Address search result"
      className={styles.addressSearchResult}
    >
      <span
        aria-description="Street name"
        className={styles.addressSearchResult_item}
      >
        {result.street},
      </span>
      <span
        aria-description="Postal number"
        className={styles.addressSearchResult_item}
      >
        {result.postNumber}
      </span>
      <span aria-description="City" className={styles.addressSearchResult_item}>
        {result.city}
      </span>
    </li>
  );
});

export default AddressSearchResult;
