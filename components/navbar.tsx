// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-600 text-white p-4 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Farm Management</h1>
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
