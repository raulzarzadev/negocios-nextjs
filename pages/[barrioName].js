import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAds } from "src/hooks/useAds";
import AdvertsList from "@comps/AdvertsList";
import Filter from "@comps/Filter.js";
import { CHIP_LABELS } from "CONST/CHIPS_LABELS";
import { useBarrios } from "src/hooks/useBarrios";

export default function Barrio() {
  const { getAdsByBarrio } = useAds();
  const router = useRouter();

  const [barrio, setBarrio] = useState(undefined);

  const {
    query: { barrioName },
  } = router;

  useEffect(() => {
    if (barrioName) {
      getAdsByBarrio(barrioName).then(setBarrio);
    }
  }, [barrioName]);

  const [adverts, setAdverts] = useState(barrio?.ads || []);

  const [filter, setFilter] = useState("Todos");

  useEffect(() => {
    setAdverts(barrio?.ads);
  }, [barrio]);

  useEffect(() => {
    if (filter === "Todos") return setAdverts(barrio?.ads);
    setAdverts(filterAdsByLable);
  }, [filter]);

  const handleSetFilter = (filter) => {
    setFilter(filter);
  };

  const filterAdsByLable = () => {
    const filtered = barrio?.ads?.filter((ad) => {
      return ad.labels.includes(filter);
    });
    return filtered;
  };
  console.log(barrio)

  const labelsAvailables = barrio?.ads?.reduce((acc, item) => {
    const labels = [...acc, item.labels].flat().reduce((acc, item) => {
      if (acc.includes(item)) return acc;
      return [...acc, item];
    }, []);

    return labels;
  }, []);

  if (barrio === undefined) return "Cargando...";
  return (
    <>
      <Filter labels={labelsAvailables} handleSetFilter={handleSetFilter} />
      <AdvertsList barrio={barrio} adverts={adverts} />
    </>
  );
}
