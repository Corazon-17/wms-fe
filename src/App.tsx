import Logo from "./components/Logo";

export default function App() {
  return (
    <div className="grid grid-cols-2 w-full min-h-screen">
      <LeftSection />
      <div className="grid place-content-center w-full min-h-scree">
        <div className="flex flex-col gap-4 max-w-151"></div>
      </div>
    </div>
  );
}

const LeftSection = () => {
  return (
    <div className="grid place-content-center w-full bg-primary text-white">
      <div className="flex flex-col gap-4 max-w-107">
        <div className="flex gap-2 items-center mb-10">
          <Logo />
          <span className="text-4xl">WMSpaceIO</span>
        </div>
        <span className="text-sm">WMS DASHBOARD</span>
        <div className="flex flex-col gap-4 text-5xl font-bold">
          <span>Manage your</span>
          <span>order with</span>
          <span>clarity.</span>
        </div>
        <p className="text-sm font-semibold mt-4">
          Track orders, manage orders, and streamline operations — all in one
          place.
        </p>
      </div>
    </div>
  );
};
