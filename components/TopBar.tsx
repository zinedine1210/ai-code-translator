import Darkmode from "./DarkMode";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 w-full py-2">
      <div className="flex items-center justify-between container mx-auto px-5 xl:px-0 z-50">
        <div>
          <h1 className="font-bold text-3xl xl:text-7xl lilita">Zzf.</h1>
        </div>
        <div>
          <Darkmode />
        </div>
      </div>
    </header>
  )
}
