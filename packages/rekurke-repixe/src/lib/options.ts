export interface Options {
  preserveUnmatchedSyntax?: boolean;
  convertEmphasisToRuby?: {
    enable: boolean;
    character?: string;
  };
}

export interface InternalOptions {
  preserveUnmatchedSyntax: boolean;
  convertEmphasisToRuby: {
    enable: boolean;
    character: string;
  };
}

export const defaultOptions: InternalOptions = {
  preserveUnmatchedSyntax: false,
  convertEmphasisToRuby: {
    enable: false,
    character: "•",
  },
};

export function buildOptions(options?: Options | null): InternalOptions {
  return {
    ...defaultOptions,
    ...options,
    convertEmphasisToRuby: {
      ...defaultOptions.convertEmphasisToRuby,
      ...options?.convertEmphasisToRuby,
    },
  };
}
