import { Chip } from "@material-ui/core";
import { CHIP_LABELS } from "CONST/CHIPS_LABELS";
import { useEffect, useState } from "react";

export default function SelectLabels({ labels = [], setLabels = {} }) {
  const LIMIT_LABLES_SELECTED = 5;
  const [labelsSelected, setLabelsSelected] = useState(labels || []);
  const handleRemoveChip = (chipKey) => () => {
    console.log(chipKey);
    const filteredLabels = labels?.filter((label) => label != chipKey);
    setLabels(filteredLabels);
  };
  console.log(labels);

  const hanldeAddChip = (chipKey) => {
    setLabels([...labels, chipKey]);
  };

  useEffect(() => {
    setLabelsSelected(
      labels?.map((label) => CHIP_LABELS.find((chip) => chip?.key === label))
    );
  }, [labels]);

  const [chipsDisplay, setChipDisplay] = useState([]);
  useEffect(() => {
    const chipsFiltered = CHIP_LABELS.filter((chip) =>
      !labels.includes(chip.key)
    );
    setChipDisplay(chipsFiltered);
  }, [labels]);
  console.log(chipsDisplay);

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
            key={chip?.key}
            style={{ margin: "4px" }}
            icon={chip?.icon}
            color={chip?.color || "primary"}
            label={chip?.label}
            size="small"
            onDelete={handleRemoveChip(chip?.key)}
          />
        ))}
      </div>
      {chipsDisplay.map((chip) => {
        return (
          <Chip
            key={chip?.key}
            disabled={labelsSelected?.length >= LIMIT_LABLES_SELECTED}
            style={{ margin: "4px" }}
            icon={chip?.icon}
            color={chip?.color || "primary"}
            label={chip?.label}
            size="small"
            onClick={() => hanldeAddChip(chip?.key)}
          />
        );
      })}
    </div>
  );
}
