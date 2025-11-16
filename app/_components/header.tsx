import SidebarButton from "./sidebar-button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row items-center justify-between">
        <Link href="/">
        <img src="/logo.png" height={18} width={120} alt="FSW Barbr" />
        </Link>

        <SidebarButton></SidebarButton>
      </CardContent>
    </Card>
  );
};

export default Header;
