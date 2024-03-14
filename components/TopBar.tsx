import Darkmode from "./DarkMode";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full py-2">
      <div className="flex items-center justify-between container mx-auto">
        <div>
          <h1 className="font-bold text-7xl lilita">Zzf.</h1>
        </div>
        <div>
          <Darkmode />
        </div>
      </div>
    </header>
  )
}
