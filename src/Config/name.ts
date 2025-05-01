import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  Config,
} from "unique-names-generator";

const randomNameConfig: Config = {
  dictionaries: [adjectives, animals ],
  separator: ".",
  length: 2,
};

export const randomName = uniqueNamesGenerator(randomNameConfig);