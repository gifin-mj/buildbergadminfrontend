// import { useState } from 'react';
// import API from '../api';

// function GalleryForm({ onUpload }) {
//   const [formData, setFormData] = useState({
//     name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
//   });
//   const [images, setImages] = useState([]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, val]) => data.append(key, val));
//     images.forEach((img) => data.append('images', img));

//     await API.post('/gallery', data);
//     setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
//     setImages([]);
//     onUpload();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
//       <input name="date" type="date" value={formData.date} onChange={handleChange} required />
//       <select name="status" placeholder="Status" value={formData.status} onChange={handleChange} required >
//         <option >Select Status</option>
//         <option value={"Ongoing"}>Ongoing</option>
//         <option value={"Upcoming"}>Upcoming</option>
//         <option value={"Completed"}>Completed</option>
//         </select>
//       <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
//       <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
//       <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} required />
//       <button type="submit">Upload Project</button>
//     </form>
//   );
// }

// export default GalleryForm;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

function GalleryForm({ onUpload }) {
  const { id } = useParams(); // get :id from route if editing
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (isEdit) {
      API.get(`/gallery/${id}`).then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || '',
          date: data.date ? new Date(data.date).toISOString().substr(0, 10) : '',
          status: data.status || '',
          sizeSqFt: data.sizeSqFt || '',
          clientDetails: data.clientDetails || '',
        });
        setExistingImages(data.images || []);
      });
    }
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    images.forEach((img) => data.append('images', img)); // append new uploads

    try {
      if (isEdit) {
        await API.patch(`/gallery/${id}`, data);
      } else {
        await API.post('/gallery', data);
      }

      setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
      setImages([]);
      setExistingImages([]);
      onUpload();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEdit ? 'Edit Project' : 'Upload Project'}</h3>

      <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <select name="status" value={formData.status} onChange={handleChange} required>
        <option>Select Status</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Completed">Completed</option>
      </select>
      <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
      <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
      <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />

      {isEdit && existingImages.length > 0 && (
        <div>
          <p>Existing Images:</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {existingImages.map((url, i) => (
              <img key={i} src={url} alt="existing" width={100} height={100} />
            ))}
          </div>
        </div>
      )}

      <button type="submit">{isEdit ? 'Update' : 'Upload'} Project</button>
    </form>
  );
}

export default GalleryForm;
/*
import { useEffect, useState } from 'react';
import API from '../api';

function GalleryForm({ onUpload, editItem }) {
  const [formData, setFormData] = useState({
    name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        date: editItem.date?.split('T')[0] || '',
        status: editItem.status,
        sizeSqFt: editItem.sizeSqFt,
        clientDetails: editItem.clientDetails,
      });
    }
  }, [editItem]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    images.forEach((img) => data.append('images', img));

    if (editItem) {
      await API.patch(`/gallery/${editItem._id}`, data); // 👈 PATCH if editing
    } else {
      await API.post('/gallery', data); // 👈 POST if new
    }

    setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
    setImages([]);
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} required />
      <select name="status" value={formData.status} onChange={handleChange} required>
        <option>Select Status</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Completed">Completed</option>
      </select>
      <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
      <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
      <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
      <button type="submit">{editItem ? 'Update Project' : 'Upload Project'}</button>
    </form>
  );
}

export default GalleryForm;


*/