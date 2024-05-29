import { getSongs } from "../../lib/useSongs";

export default async function Annotations() {

  const data = await getSongs()

  return (
    <div>
        {data.map((song) => (
            <p key={song.id}>{song.name}</p>
          ))}
    </div>
  );
}
