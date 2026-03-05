export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-6">

      <h1 className="text-pink-500 font-bold text-xl">
        vrinda
      </h1>

      <ul className="flex gap-10 text-gray-700 font-medium">
        <li>HOME</li>
        <li>ABOUT</li>
        <li>WORKS</li>
        <li>SERVICES</li>
        <li className="text-pink-500">PORTFOLIO</li>
      </ul>

    </nav>
  )
}