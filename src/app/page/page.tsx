import { getSongs } from "../../lib/useSongs";

export default async function Annotations() {

  const data = await getSongs()

  return (
    <div>
        {data.map((song, index) => (
            <p>{song.name}</p>
          ))}
    </div>
  );
}
