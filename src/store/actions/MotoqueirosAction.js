import { MOTOQUEIROS_UPDATE } from "./types";

export const updateMotoqueiros = motoqueiros => {
  return {
    type: MOTOQUEIROS_UPDATE,
    payload: motoqueiros
  };
};
