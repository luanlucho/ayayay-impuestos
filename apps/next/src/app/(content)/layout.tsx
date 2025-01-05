import { Hydrate } from "@tanstack/react-query";

import { LayoutProps as Props } from "app/types";
import Footer from "components/global/Footer/Footer";
import Navbar from "components/global/Navbar/Navbar";
import { trpcServer } from "config/trpc.server.config";

const DashboardLayout = async (props: Props) => {
  const { children } = props;

  const dehydratedState = trpcServer.dehydrate({
    shouldDehydrateQuery: query => query.state.status !== "error"
  });

  return (
    <Hydrate state={dehydratedState}>
      <div className="DashboardLayout grid h-full w-full grid-cols-[1fr] grid-rows-[max-content,1fr]">
        <Navbar className="col-span-2" />
        <main>{children}</main>
        <Footer className="col-span-2" />
      </div>
    </Hydrate>
  );
};

export default DashboardLayout;
