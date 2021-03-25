import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function KeyboardNumbers({ value, setValue, hideDisplay }) {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    if (value) return setNumber(value);
  }, []);

  useEffect(() => {
    if (setValue) setValue(number);
  }, [number]);

  const handleAdd = (newNumber) => {
    if (number === null) return setNumber(newNumber);
    setNumber(number.concat(newNumber));
  };
  const handleReset = () => {
    setNumber(null);
    setValue("");
  };

  return (
    <div>
      <div className={styles.numbers_input}>
        {!hideDisplay && (
          <div className={styles.numbers_display}>
            {number || "Ingresa una cantidad"}
          </div>
        )}
        <div className={styles.numbers_keyboard}>
          <div className={styles.numbers_key} onClick={() => handleAdd("1")}>
            1
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("2")}>
            2
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("3")}>
            3
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("4")}>
            4
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("5")}>
            5
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("6")}>
            6
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("7")}>
            7
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("8")}>
            8
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("9")}>
            9
          </div>
          <div className={styles.numbers_key} onClick={() => handleReset()}>
            Res
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd("0")}>
            0
          </div>
          <div className={styles.numbers_key} onClick={() => handleAdd(".")}>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
