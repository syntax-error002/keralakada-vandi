import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <header className="bg-gradient-header text-primary-foreground p-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Menu className="w-6 h-6" />
            </Button>
          </SidebarTrigger>
          <div>
            <h1 className="text-xl font-bold">Kerala Krishi Bazaar</h1>
            <p className="text-sm opacity-90">Live Crop Prices</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
          <Bell className="w-6 h-6" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search crops (English/Malayalam)..."
          className="pl-10 bg-white/10 border-white/20 text-primary-foreground placeholder:text-white/70 focus:bg-white/15"
        />
      </div>
    </header>
  );
};

export default Header;
