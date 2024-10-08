type Preprocessor = (doc: string) => string;

export const preprocess: Preprocessor = (doc) => {
  const processors: Preprocessor[] = [replaceCrToLf];
  let result = doc;
  for (const processor of processors) {
    result = processor(result);
  }
  return result;
};

const replaceCrToLf: Preprocessor = (doc) => {
  return doc.replace(/(\r)(?!\n)/gmu, "\n");
};
