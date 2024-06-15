import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Pagination from './Pagination';

const Home = () => {
  
  const apiUrl = import.meta.env.VITE_API_URL;
  const [missions, setMissions] = useState([]);
  const [filteredMissions, setFilteredMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [launchYear, setLaunchYear] = useState('');
  const [launchStatus, setLaunchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [missionsPerPage] = useState(10);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMissions(response.data);
        setFilteredMissions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  useEffect(() => {
    const filterMissions = () => {
      const lowercasedSearch = search.toLowerCase();
      const filtered = missions.filter(mission =>
        mission.mission_name.toLowerCase().includes(lowercasedSearch) &&
        (launchYear ? new Date(mission.launch_date_local).getFullYear().toString() === launchYear : true) &&
        (launchStatus ? (launchStatus === 'success' ? mission.launch_success : !mission.launch_success) : true)
      );
      setFilteredMissions(filtered);
      setCurrentPage(1); // Reset to first page on search/filter change
    };

    filterMissions();
  }, [search, launchYear, launchStatus, missions]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleLaunchYearChange = (e) => {
    setLaunchYear(e.target.value);
  };

  const handleLaunchStatusChange = (e) => {
    setLaunchStatus(e.target.value);
  };

  const indexOfLastMission = currentPage * missionsPerPage;
  const indexOfFirstMission = indexOfLastMission - missionsPerPage;
  const currentMissions = filteredMissions.slice(indexOfFirstMission, indexOfLastMission);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading missions: {error.message}</div>;
  }

  return (
    <>
    <Header/>
    <Footer/>
    <div className="p-8">
      <h2 className="text-4xl mb-4 text-center">SpaceX Missions</h2>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search missions"
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full max-w-sm"
        />
        <select
          value={launchYear}
          onChange={handleLaunchYearChange}
          className="p-2 border rounded w-full max-w-sm"
        >
          <option value="">All Years</option>
          {[...new Set(missions.map(mission => new Date(mission.launch_date_local).getFullYear()))].sort().map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={launchStatus}
          onChange={handleLaunchStatusChange}
          className="p-2 border rounded w-full max-w-sm"
        >
          <option value="">All Statuses</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Mission Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Mission Patch</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Launch Date</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Rocket Name</th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">Site Name</th>
            </tr>
          </thead>
          <tbody>
            {currentMissions.map((mission) => (
              <tr key={mission.flight_number}>
                <td className="py-2 px-4 border-b border-gray-200">{mission.mission_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {mission.links.mission_patch ? (
                    <img src={mission.links.mission_patch} alt={mission.mission_name} className="h-12" />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">{new Date(mission.launch_date_local).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b border-gray-200">{mission.rocket.rocket_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{mission.launch_site.site_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        missionsPerPage={missionsPerPage}
        totalMissions={filteredMissions.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
    </>
 
  );
};

export default Home;

