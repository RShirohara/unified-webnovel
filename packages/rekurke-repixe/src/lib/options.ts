export interface Options {
  preserveUnmatchedSyntax?: boolean;
  convertEmphasisToRuby?: {
    enable: boolean;
    character?: string;
  };
}

interface Option {
  preserveUnmatchedSyntax: boolean;
  convertEmphasisToRuby: {
    enable: boolean;
    character: string;
  };
}

export const defaultOptions: Option = {
  preserveUnmatchedSyntax: false,
  convertEmphasisToRuby: {
    enable: false,
    character: "•",
  },
};

export function buildOptions(options?: Options | null): Option {
  return {
    ...defaultOptions,
    ...options,
    convertEmphasisToRuby: {
      ...defaultOptions.convertEmphasisToRuby,
      ...options?.convertEmphasisToRuby,
    },
  };
}
