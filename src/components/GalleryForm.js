import { useState } from 'react';
import API from '../api';

function GalleryForm({ onUpload }) {
  const [formData, setFormData] = useState({
    name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append('image', image);

    await API.post('/gallery', data);
    setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
    setImage(null);
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
      <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
      <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default GalleryForm;


/*
import { useState } from 'react';
import API from '../api';

function GalleryForm({ onUpload }) {
  const [formData, setFormData] = useState({
    name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    images.forEach((img) => data.append('images', img)); // append each image

    await API.post('/gallery', data);
    setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
    setImages([]);
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <input name="status" placeholder="Status" value={formData.status} onChange={handleChange} required />
      <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
      <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
      <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} required />
      <button type="submit">Upload Project</button>
    </form>
  );
}

export default GalleryForm;
*/