export default function adsByBarrioHandler(req, res) {
  console.log("api", req.query);

  const {
    query: { barrio },
    method,
  } = req;

  res.status(200).json({
    ok: true,
    id: "sa568rttibz",
    name: "nombre-del-barrio",
    state: barrio.state,
    ads: [
      {
        id: "1sad",
        title: "advert 1",
        barriosId: ["sa568rttibz", "edwe234ererv"],
        content:
          "lorem ipsum memo destret we 4645h4 ndea asasda   sdewdwe ee e u65 ",
        images: ["url/external/image"],
        labels: ["drink", "mom", "healtcare"],
      },
      {
        id: "3yui",
        title: "advert 3",
        barriosId: ["sa568rttibz"],
        content:
          "lorem ipsum memo destret we 4645h4 ndea asasda   sdewdwe ee e u65 ",
        images: ["url/external/image"],
        labels: ["drink", "food"],
      },
    ],
  });
}
