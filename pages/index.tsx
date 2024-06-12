import NotificationsPage from "../src/modules/NotificationsPage";

// https://github.com/nrwl/nx/issues/9017#issuecomment-1180462040
import path from "path";
path.resolve("./next.config.js");

export default function Index() {
  return <NotificationsPage />;
}
