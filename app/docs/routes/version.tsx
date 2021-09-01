import * as React from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  json,
  LoaderFunction,
  RouteComponent,
  useMatches,
  useRouteData,
} from "remix";
import { DataOutlet } from "~/components/data-outlet";
import {
  getMenu,
  getVersion,
  getVersions,
  MenuDir,
  VersionHead,
} from "~/utils.server";

interface RouteData {
  menu: MenuDir;
  versions: VersionHead[];
  version: VersionHead;
}

let loader: LoaderFunction = async ({ context, params }) => {
  try {
    let versions = await getVersions();
    let version = getVersion(params.version, versions) || {
      version: params.version,
      head: params.version,
      isLatest: false,
    };

    let menu = await getMenu(context.docs, version);

    let data: RouteData = { menu, version, versions };

    // so fresh!
    return json(data, { headers: { "Cache-Control": "max-age=0" } });
  } catch (error: unknown) {
    console.error(error);
    return json({ notFound: true }, { status: 404 });
  }
};

let handle = {
  crumb: (
    { data: { version } }: { data: { version: VersionHead } },
    ref: any
  ) => (
    <Link ref={ref} to={"/docs/" + version.head}>
      {version.head}
    </Link>
  ),
};

export type MenuMap = Map<string, MenuDir>;

function createMenuMap(dir: MenuDir, map: MenuMap = new Map()) {
  for (let file of dir.files) {
    map.set(file.path, dir);
  }
  if (dir.dirs) {
    for (let childDir of dir.dirs) {
      createMenuMap(childDir, map);
    }
  }
  return map;
}

let VersionPage: RouteComponent = () => {
  let data = useRouteData<RouteData>();
  let matches = useMatches();
  let menuMap = React.useMemo(() => createMenuMap(data.menu), [data.menu]);
  let [navIsOpen, setNavIsOpen] = React.useState(false);
  let location = useLocation();

  React.useEffect(() => {
    if (navIsOpen) {
      document.body.setAttribute("data-nav-open", "");
    } else {
      document.body.removeAttribute("data-nav-open");
    }
  }, [navIsOpen]);

  React.useEffect(() => {
    setNavIsOpen(false);
  }, [location]);

  let is404 = matches.some((match: any) => match.data && match.data.notFound);
  if (is404) return <NotFound />;

  return (
    <>
      <button id="nav-toggle" onClick={() => setNavIsOpen((old) => !old)}>
        {navIsOpen ? <Close /> : <Hamburger />}
      </button>
      <h2>Version: {data.version.version}</h2>
      <div className="root" data-open={navIsOpen ? "" : null}>
        <div className="primary-nav-container">
          <nav className="primary-nav">
            <div style={{ marginTop: "2rem" }} />

            <Menu data={data} />
          </nav>
        </div>
        <DataOutlet context={menuMap} />
      </div>
    </>
  );
};

function Menu({ data }: { data: RouteData }) {
  let navigate = useNavigate();
  let params = useParams();
  let isOtherTag = !data.versions.find((v) => v.head === params.version);

  return (
    <nav aria-label="Site">
      <div data-docs-version-wrapper>
        <select
          data-docs-version-select
          defaultValue={data.version.head}
          onChange={(event) => {
            navigate(`/docs/${params.lang}/${event.target.value}`);
          }}
        >
          {isOtherTag && (
            <option value={params.version}>{params.version}</option>
          )}
          {data.versions.map((v) => (
            <option key={v.head} value={v.head}>
              {v.head}
            </option>
          ))}
        </select>
      </div>
      <MenuList level={1} dir={data.menu} />
    </nav>
  );
}

function MenuList({ dir, level = 1 }: { dir: MenuDir; level?: number }) {
  const { lang, version } = useParams();
  const linkPrefix = `/docs/${lang}/${version}`;
  return (
    <ul data-docs-menu data-level={level}>
      {dir.dirs &&
        dir.dirs.map((dir, index) => (
          <li data-docs-dir data-level={level} key={index}>
            {dir.hasIndex ? (
              <NavLink data-docs-link to={`${linkPrefix}${dir.path}`}>
                {dir.title}
              </NavLink>
            ) : (
              <span data-docs-label>{dir.title}</span>
            )}
            <MenuList level={level + 1} dir={dir} />
          </li>
        ))}
      {dir.files.map((file, index) => (
        <li data-docs-file key={index}>
          {file.attributes.disabled ? (
            <span data-docs-label data-docs-disabled-file>
              {file.title} 🚧
            </span>
          ) : (
            <NavLink data-docs-link to={`${linkPrefix}${file.path}`}>
              {file.title}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

function NotFound() {
  return (
    <div data-docs-not-found>
      <h1>Not Found</h1>
    </div>
  );
}

function Hamburger() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "2rem", width: "2rem" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

function Close() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "2rem", width: "2rem" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default VersionPage;
export { createMenuMap, handle, loader };
