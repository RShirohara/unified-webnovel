export interface Options {
  preserveUnmatchedSyntax?: boolean;
}

interface InternalOptions {
  preserveUnmatchedSyntax: boolean;
}

export const defaultOptions: InternalOptions = {
  preserveUnmatchedSyntax: false,
};

export function buildOptions(options?: Options | null): InternalOptions {
  return {
    ...defaultOptions,
    ...options,
  };
}
