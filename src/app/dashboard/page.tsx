import Sidebar from '../../components/sidebar';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-200">
        <h1>Welcome to the Dashboard</h1>
        {/* Content of the dashboard here */}
      </div>
    </div>
  );
};

export default DashboardPage;
