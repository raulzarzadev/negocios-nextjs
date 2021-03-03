import StateList from "@comps/StatesList.js";
import { useEffect, useState } from "react";
import { useAds } from "src/hooks/useAds";
import { useBarrios } from "src/hooks/useBarrios";

export default function ViewBarrios() {
  const { getBarrios } = useBarrios();
  const { getAds } = useAds();
  const [barrios, setBarrios] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBarrios().then((res) => setBarrios(res));
    getAds().then((res) => setAds(res));
  }, []);

  console.log(barrios, ads);

  const normalizeBarriosList = (barrios, ads) => {
    barrios.reduce((acc, curr) => {
      
    })
  }

  const formatBarrioList = [
    {
      name: "Estado 1 ",
      barrios: [
        { name: "Barrio name", shortName: "barrio", advertsPublished: 3 },
        { name: "Barrio name 2", shortName: "barrio", advertsPublished: 2 },
        { name: "Barrio name 3", shortName: "barrio", advertsPublished: 5 },
      ],
    },
    {
      name: "Estado2  ",
      barrios: [
        { name: "Barrio name", shortName: "barrio", advertsPublished: 3 },
        { name: "Barrio name 2", shortName: "barrio", advertsPublished: 2 },
        { name: "Barrio name 3", shortName: "barrio", advertsPublished: 5 },
      ],
    },
    {
      name: "Estado 3  ",
      barrios: [
        { name: "Barrio name", shortName: "barrio", advertsPublished: 3 },
        { name: "Barrio name 2", shortName: "barrio", advertsPublished: 2 },
        { name: "Barrio name 3", shortName: "barrio", advertsPublished: 5 },
      ],
    },
  ];
  if (loading) return "Cargando...";

  return <StateList statesList={formatBarrioList} />;
}
