import NewAdForm from "@comps/NewAdForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAds } from "src/hooks/useAds";

export default function EditAdvert() {
  const [advert, setAdvert] = useState(undefined);
  const router = useRouter();
  const { getAdvert } = useAds();

  useEffect(() => {
    const {
      query: { advertId },
    } = router;
    if (advertId) {
      getAdvert(advertId).then(setAdvert);
    }
  }, [router]);
  if (advert === undefined) return "Cargando...";
  return <NewAdForm advert={advert} />;
}
