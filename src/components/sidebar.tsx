import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside id="default-sidebar" className="fixed top-14 left-0 z-40 w-64 h-[calc(100vh-3.5rem)] transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800" aria-label="Sidebar">
      <div className="px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {/* Dashboard Link */}
          <li>
            <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-4-4m0 0l4-4m-4 4h14m-5 4l4 4m0 0l-4 4m4-4H7" /></svg>
              <span>Dashboard</span>
            </Link>
          </li>
          {/* Kanban Link */}
          <li>
            <Link href="/kanban" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h2v4H3zm4 0h2v4H7zm4 0h2v4h-2zm4 0h2v4h-2zm4 0h2v4h-2M5 10V6h14v4M5 14v4h14v-4M5 6V5a2 2 0 012-2h10a2 2 0 012 2v1" /></svg>
              <span>About Us</span>
            </Link>
          </li>
          {/* Additional links should be added here in the same format */}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
