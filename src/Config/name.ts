import {
  uniqueNamesGenerator,
  colors,
  Config,
} from "unique-names-generator";

const randomNameConfig: Config = {
  dictionaries: [colors],
  separator: " ",
  length: 1,
};

export const randomName = uniqueNamesGenerator(randomNameConfig);