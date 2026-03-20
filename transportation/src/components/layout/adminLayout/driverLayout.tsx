import { useState } from "react";
import {
  LayoutDashboard,
  Bus,
  Ticket,
  Settings,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../context/auth.context";
import { toast } from "sonner";

const DriverPage = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const {loggedInUser} = useAuth();
  const Navigate = useNavigate();

   try {
    if(!loggedInUser){
      toast.error("Please login first!!");
      Navigate("/")
      throw({
        code:401,
        message:"Login First"
      })
    }
  if(loggedInUser?.role!=='driver'){
    toast.error("You don't have permission to access this route!!!!",{
      description:"Only the driver can access it..!!"
    })
  }
   } catch (error) {
    
   }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-200">

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-slate-900 border-b border-white/10">
        <h1 className="text-lg font-bold">
          Suv<span className="text-emerald-500">Yatra</span>
        </h1>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:flex
        bg-slate-900 border-r border-white/10 flex flex-col p-6 space-y-8`}
      >
        {/* Close Button (mobile) */}
        <div className="flex justify-between items-center lg:hidden">
          <h1 className="text-xl font-bold">
            Suv<span className="text-emerald-500">Yatra</span>
          </h1>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Logo (desktop) */}
        <div className="hidden lg:block text-2xl font-bold text-white">
          Suv<span className="text-emerald-500">Yatra</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <a href="/driver">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={location.pathname === "/driver"}
            />
          </a>

          <a href="/driver/trip-update">
            <NavItem
              icon={<Bus size={20} />}
              label="View Trips"
              active={location.pathname.includes("/driver/trip-update")}
            />
          </a>

          <a href="/driver/view-booking">
            <NavItem
              icon={<Ticket size={20} />}
              label="Bookings"
              active={location.pathname.includes("/driver/view-booking")}
            />
          </a>

          <a href="/driver/chat">
            <NavItem
              icon={<MessageCircle size={20} />}
              label="Chat"
              active={location.pathname.includes("/driver/chat")}
            />
          </a>

          <a href="/driver/settings">
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              active={location.pathname.includes("/driver/settings")}
            />
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 mt-16 lg:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

/* Nav Item */
const NavItem = ({ icon, label, active = false }: any) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition
    ${
      active
        ? "bg-emerald-500/10 text-emerald-400"
        : "hover:bg-white/10 text-slate-400"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default DriverPage;