import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../auth';
import API from '../api';
import GalleryForm from '../components/GalleryForm';
import GalleryItem from '../components/GalleryItem';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  const fetchGallery = async () => {
    const res = await API.get('/gallery');
    setGallery(res.data);
  };

  useEffect(() => {
    if (!getToken()) navigate('/');
    fetchGallery();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <div>
      <h1>Gallery Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <GalleryForm onUpload={fetchGallery} />
      <hr />
      {gallery.map((item) => (
        <GalleryItem key={item._id} item={item} onUpdate={fetchGallery} />
      ))}
    </div>
  );
}

export default Dashboard;
