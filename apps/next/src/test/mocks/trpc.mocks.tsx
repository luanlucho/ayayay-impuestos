// trpc mocks
import { buildCurrency } from "@repo/builders";

import { TEST } from "test/constants";

export const buildTrpcMock = (overrides: Record<string, any> = {}) => {
  const queryResult = vi.fn().mockReturnValue({ data: [] });
  const fetchResult = vi.fn().mockResolvedValue(Promise.resolve([]));
  const currency = buildCurrency({ id: TEST.CURRENCY_ID });

  return {
    createClient: vi.fn(),
    Provider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    ...overrides,
    general: {
      currencies: {
        select: {
          useQuery: vi.fn().mockReturnValue({ data: [currency] }),
          fetch: vi.fn().mockResolvedValue(Promise.resolve([currency]))
        },
        ...overrides.general?.currencies
      },
      timezones: {
        select: {
          useQuery: queryResult,
          fetch: fetchResult
        },
        ...overrides.general?.timezones
      }
    },
    useUtils: vi.fn().mockReturnValue({
      general: {
        invalidate: vi.fn()
      }
    })
  };
};
