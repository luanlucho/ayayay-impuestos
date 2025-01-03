import { act, cleanup, renderHook } from "@testing-library/react";
import next from "next";
import { vi } from "vitest";

import { TEST } from "./constants";
import { buildTrpcMock } from "./mocks/trpc.mocks";
import { useGlobalsStore } from "stores/globals/globals.store";
import { Textarea } from "ui/textarea";

next({ dev: true });

afterEach(cleanup);

Object.defineProperty(global.window, "scrollTo", { value: vi.fn() });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

vi.mock("next-client-cookies", () => ({
  CookiesProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useCookies: () => ({
    get: vi.fn().mockReturnValue(TEST.ACCOUNT_ID)
  })
}));

vi.mock("next/headers", () => ({
  headers: vi.fn(() => ({}))
}));

vi.mock("next/router", () => ({
  useRouter() {
    return {
      basePath: "",
      pathname: "/",
      route: "/",
      asPath: "/",
      query: {},
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn()
      },
      isFallback: false
    };
  }
}));

vi.mock("next/navigation", () => ({
  useParams: () => ({}),
  useRouter() {
    return {
      basePath: "",
      pathname: "/",
      route: "/",
      asPath: "/",
      query: {},
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn()
      },
      isFallback: false
    };
  },
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams()
}));

vi.mock("next/image", () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  }
}));

vi.mock("gantt-task-react", async () => {
  const actual: Record<string, unknown> =
    await vi.importActual("gantt-task-react");
  return {
    ...actual,
    Gantt: vi.fn(() => <div>Mocked Gantt</div>)
  };
});

(window as any).IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

vi.mock("@monaco-editor/react", () => ({
  Editor: vi.fn(props => {
    const { defaultLanguage, ...rest } = props;
    return <Textarea {...rest} />;
  })
}));

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {
      // Mock implementation of observe
    }
    unobserve() {
      // Mock implementation of unobserve
    }
    disconnect() {
      // Mock implementation of disconnect
    }
  };
});

beforeAll(async () => {
  const store = renderHook(() => useGlobalsStore()).result;
  const { setSelectedAccountId } = store.current;
  act(() => setSelectedAccountId(TEST.ACCOUNT_ID));
});

vi.mock("config/trpc.config", () => ({
  trpc: buildTrpcMock()
}));

vi.mock("config/trpc.server.config", () => ({
  trpcServer: buildTrpcMock()
}));

window.HTMLElement.prototype.scrollIntoView = function () {};

window.HTMLElement.prototype.hasPointerCapture = function () {
  return false;
};

// Mocking Supabase
process.env.NEXT_PUBLIC_SUPABASE_URL = "http://localhost:8000";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
