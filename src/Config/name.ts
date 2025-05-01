import {
  uniqueNamesGenerator,
  colors,
  adjectives,
  animals,
  Config,
} from "unique-names-generator";

const randomNameConfig: Config = {
  dictionaries: [colors, adjectives, animals ],
  separator: ".",
  length: 2,
};

export const randomName = uniqueNamesGenerator(randomNameConfig);