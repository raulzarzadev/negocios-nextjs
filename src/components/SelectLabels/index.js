import { Chip } from "@material-ui/core";
import { CHIP_LABELS } from "CONST/CHIPS_LABELS";
import { useEffect, useState } from "react";

export default function SelectLabels({ labels = [], setLabels = {} }) {
  /* TODO no carga las labels existentes */
  const [labelsSelected, setLabelsSelected] = useState(labels || []);
  const handleDeleteChip = (chip) => () => {
    let res = labelsSelected.filter((element) => element !== chip);
    setLabelsSelected(res);
  };

  const hanldeAddChip = (chip) => {
    setLabelsSelected([...labelsSelected, chip]);
    setLabels([...labels, chip.value]);
  };
  const LIMIT_LABLES_SELECTED = 5;
  /* 
  useEffect(() => {
    setAdvert({ ...advert, labels: labelsSelected });
  }, [labelsSelected]); */

  return (
    <div>
      <em>Max {LIMIT_LABLES_SELECTED} etiquetas</em>
      <div
        style={{
          maxWidth: "300px",
          border: "1px solid black",
          borderRadius: "16px",
          padding: "16px",
          minHeight: "48px",
          margin: "16px auto",
        }}
      >
        {labelsSelected?.map((chip, i) => (
          <Chip
            key={i}
            style={{ margin: "4px" }}
            icon={chip?.icon}
            color={chip?.color || "primary"}
            label={chip?.label}
            size="small"
            onDelete={handleDeleteChip(chip)}
          />
        ))}
      </div>
      {CHIP_LABELS.map((chip, i) => {
        return (
          <Chip
            key={i}
            disabled={labelsSelected?.length >= LIMIT_LABLES_SELECTED}
            style={{ margin: "4px" }}
            icon={chip?.icon}
            color={chip?.color || "primary"}
            label={chip?.label}
            size="small"
            onClick={() => hanldeAddChip(chip)}
          />
        );
      })}
    </div>
  );
}
