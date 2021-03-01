// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Initialize Cloud Firestore through Firebase




export default function barriosHandler(req, res) {
  res.status(200).json({
    ok: true,
    barrios: [
      { id: "1", name: "barrio 1", localidad: "Santa Ana" },
      { id: "2", name: "barrio 2", localidad: "San Miguel" },
      { id: "3", name: "barrio 3", localidad: "Morelos" },
    ],
  });
}
