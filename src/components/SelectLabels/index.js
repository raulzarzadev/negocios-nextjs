import { Chip } from "@material-ui/core";
import { CHIP_LABELS } from "CONST/CHIPS_LABELS";
import { useEffect, useState } from "react";

export default function SelectLabels({ labels = [], setLabels = {} }) {
  const [labelsSelected, setLabelsSelected] = useState(labels || []);
  const handleDeleteChip = (chip) => () => {
    const filteredLabels = labels.filter((label) => label != chip);
    setLabels(filteredLabels);
  };

  const hanldeAddChip = (chip) => {
    setLabels([...labels, chip.value]);
  };
  const LIMIT_LABLES_SELECTED = 5;

  useEffect(() => {
    if (labels) {
      const selected = labels.map((label) =>
        CHIP_LABELS.find((chip) => chip.value === label)
      );
      setLabelsSelected(selected);
    }
  }, [labels]);


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
            onDelete={handleDeleteChip(chip.value)}
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
