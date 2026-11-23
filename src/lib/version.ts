import { version } from "../../package.json";

/** Major and minor version, for the site header tag. */
export const siteVersion = `v${version.split(".").slice(0, 2).join(".")}`;
