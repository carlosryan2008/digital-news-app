import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query; // Coordenadas do usuário ou do local central

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const radius = 5000; // Raio de busca em metros (5 km)
  const type = "museum"; // Procurar por museus

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data.results);
    } else {
      res.status(400).json({ message: "Erro ao buscar museus" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
}
