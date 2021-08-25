import * as React from "react";
import type { LoaderFunction, RouteComponent } from "remix";
import { Link } from "react-router-dom";
import { json } from "remix";

import { getDoc, getVersion, getVersions } from "../../utils.server";
import { Page } from "../../components/page";

let loader: LoaderFunction = async ({ params, context }) => {
  try {
    let versions = await getVersions();

    let version = getVersion(params.version, versions) || {
      version: params.version,
      head: params.version,
      isLatest: false,
    };

    let slugParam = params["*"];
    // get rid of the trailing `/`
    let slug = slugParam.replace(/\/$/, "");

    let doc = await getDoc(context.docs, slug, version);

    // we could also throw an error in getDoc if the doc doesn't exist
    if (!doc) {
      return json({ notFound: true }, { status: 404 });
    }

    // so fresh!
    return json(doc, { headers: { "Cache-Control": "max-age=0" } });
  } catch (error) {
    console.error(error);
    return json({ notFound: true }, { status: 404 });
  }
};

const SplatPage: RouteComponent = () => {
  return <Page />;
};

let handle = {
  crumb: (match: any, ref: any) => (
    <Link to={match.pathname + match.params["*"]} ref={ref}>
      {match.data.title}
    </Link>
  ),
};

export default SplatPage;
export { handle, loader };
export { meta } from "../../components/page";
