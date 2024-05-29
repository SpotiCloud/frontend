import { Song } from "../types";
import env from "./environment";

export const getSongs = async (): Promise<Song[]> => {
  try {
    const res = await fetch(`${env.API_URL}/api/Song/all`, {
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

export const getSong = async (): Promise<Song> => {
  try {
    const res = await fetch(`${env.API_URL}/api/Song/9`, {
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
