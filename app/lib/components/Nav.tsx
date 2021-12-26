import { Link } from "remix";
import { SettingsIcon } from "~/lib/components/icons/Settings";
import { HomeIcon } from "~/lib/components/icons/Home";

export function Nav() {
  return (
    <nav className="flex flex-col justify-between items-center px-2 py-4 shadow-2xl">
      <Link to="/app">
        <HomeIcon />
      </Link>
      <Link to="/app/profile">
        <SettingsIcon />
      </Link>
    </nav>
  );
}