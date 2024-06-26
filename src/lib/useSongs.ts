import { Song } from "../types";

export const getSongs = async (token): Promise<Song[]> => {
  try {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_MUSIC_API_URL}/music/song/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch songs");
    }

    const body = await res.json();
    return body.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSong = async (token): Promise<Song> => {
  try {
    //console.log(process.env.KEYCLOAK_CLIENT_ID);
    console.log(token);
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_MUSIC_API_URL}/music/song/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch songs");
    }

    const body = await res.json();
    console.error(body);
    return body.data;
  } catch (error) {
    console.error(error);
    return {} as Song;
  }
};

/*export const postAnnotation = async (annotation: Song) => {
  try {
    await fetch(`${env.API_URL}/annotations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(annotation),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnnotation = async (id: number) => {
  try {
    await fetch(`${env.API_URL}/annotations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};*/
