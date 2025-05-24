import { useEffect, useState } from 'react';
import { getToken, removeToken } from '../auth';
import API from '../api';
import GalleryForm from '../components/GalleryForm';
//import GalleryItem from '../components/GalleryItem';
import { useNavigate } from 'react-router-dom';
import GalleryTable from '../components/GalleryTable';
import './Dashboard.css'

function Dashboard() {
  const [gallery, setGallery] = useState([]);
  const [editItem, setEditItem] = useState(null); // 👈 holds the item being edited
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
    <div className='dashboard'>
      <div className='header'>
          <h1>Admin Dashboard</h1>
          <button className='button-80' role="button" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>  Logout</button>
      </div>
      <GalleryForm
        onUpload={() => {
          fetchGallery();
          setEditItem(null); // reset edit state after upload
        }}
        editItem={editItem} // pass edit item
      />

      <hr  />
      {/* {gallery.map((item) => (
        <GalleryItem
          key={item._id}
          item={item}
          onUpdate={fetchGallery}
          onEdit={setEditItem} 
        />
      ))} */}
      {

        <GalleryTable gallery={gallery} onUpdate={fetchGallery} onEdit={setEditItem} />

      }
    </div>
  );
}
export default Dashboard;