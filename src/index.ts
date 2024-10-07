export async function safeFetch(input: RequestInfo | URL, init?: RequestInit | null): Promise<SafeFetchRequestResponse> {
  try {
    const response = await fetch(input, init ?? {});

    async function text(): SafeFetchParse {
      try {
        const data = await response.json();
        return [null, data];
      } catch(error) {
        return [new SafeFetchError('PARSE_ERROR', error as Error), null]
      }
    }

    async function json(): SafeFetchParse {
      try {
        const data = await response.json();
        return [null, data];
      } catch(error) {
        return [new SafeFetchError('PARSE_ERROR', error as Error), null]
      }
    }

    return [null, { json, text }] as const;
  } catch (error) {
    return [new SafeFetchError('NETWORK_ERROR', error as Error), null] as const
  }
}

export type SafeFetchParse = Promise<[SafeFetchError, null] | [null, NonNullable<any>]>

export type SafeFetchRequestResponse = 
  | [ SafeFetchError, null ]
  | [ null, { json: () => SafeFetchParse, text: () => SafeFetchParse } ]

export type SafeFetchParseResponse = 
  | [ SafeFetchError, null ]
  | [ null, Promise<string> ]

export type SafeFetchErrorType = 'NETWORK_ERROR' | 'PARSE_ERROR';

export class SafeFetchError extends Error {
  constructor(type: SafeFetchErrorType, error: Error) {
    super(error.message);
    this.name = `[SafeFetch Error] ${type}`;
  }
}