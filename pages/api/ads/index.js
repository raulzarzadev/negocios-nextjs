export default function adsHandler(req, res) {
    res.status(200).json({
      ok: true,
      ads: [
        {
          id: "1sad",
          title: "advert 1",
          barriosId: ["sa568rttibz","edwe234ererv"],
          content:
            "lorem ipsum memo destret we 4645h4 ndea asasda   sdewdwe ee e u65 ",
          images: ["url/external/image"],
        },
        {
          id: "as2",
          title: "advert 2",
          barriosId: ["sa56rthrt8bz"],
          content:
            "lorem ipsum memo destret we 4645h4 ndea asasda   sdewdwe ee e u65 ",
          images: ["url/external/image"],
        },
        {
          id: "3yui",
          title: "advert 3",
          barriosId: [],
          content:
            "lorem ipsum memo destret we 4645h4 ndea asasda   sdewdwe ee e u65 ",
          images: ["url/external/image"],
        },
      ],
    });
  }
  