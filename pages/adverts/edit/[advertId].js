import NewAdForm from "@comps/NewAdForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PrivateRoute from "src/HOC/PrivateRoute";
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
  return <PrivateRoute Component={NewAdForm} advert={advert} />;
}
