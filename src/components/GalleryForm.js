// import { useEffect, useState } from 'react';
// import API from '../api';
// import './GalleryForm.css'

// function GalleryForm({ onUpload, editItem }) {
//   const [formData, setFormData] = useState({
//     name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
//   });
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (editItem) {
//       setFormData({
//         name: editItem.name,
//         date: editItem.date?.split('T')[0] || '',
//         status: editItem.status,
//         sizeSqFt: editItem.sizeSqFt,
//         clientDetails: editItem.clientDetails,
//       });
//     }
//   }, [editItem]);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, val]) => data.append(key, val));
//     images.forEach((img) => data.append('images', img));

//     if (editItem) {
//       await API.patch(`/gallery/${editItem._id}`, data); // 👈 PATCH if editing
//     } else {
//       await API.post('/gallery', data); // 👈 POST if new
//     }

//     setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
//     setImages([]);
//     onUpload();
//   };

//   return (
//     <div className='gallerform'>
//       <h1 className='formheading'>{editItem ? 'Update Project' : 'Add New Project'} </h1>
//       <form onSubmit={handleSubmit}>
//       <div className='details'>
//       <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
//       <input name="date" title='Date Commenced' type="date" value={formData.date} onChange={handleChange} required />
    
//       <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
//       <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
//       </div>
//       <div className='selectimagesubmit'>
//       <select name="status" value={formData.status} onChange={handleChange} required>
//         <option>Select Status</option>
//         <option value="Ongoing">Ongoing</option>
//         <option value="Upcoming">Upcoming</option>
//         <option value="Completed">Completed</option>
//       </select>
//       <input type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
//       <button className='submitbtn' type="submit">{editItem ? 'Update' : 'Save'}</button>
//       </div>
//     </form>
//     </div>
    
//   );
// }

// export default GalleryForm;
import { useEffect, useState } from 'react';
import API from '../api';
import './GalleryForm.css';

function GalleryForm({ onUpload, editItem }) {
  const [formData, setFormData] = useState({
    name: '', date: '', status: '', sizeSqFt: '', clientDetails: ''
  });
  const [images, setImages] = useState([]); // [{ file, preview }]
  
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => {
      const updated = prev.filter((_, index) => index !== indexToRemove);
      // Cleanup object URL
      URL.revokeObjectURL(prev[indexToRemove].preview);
      return updated;
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    images.forEach(({ file }) => data.append('images', file));

    if (editItem) {
      await API.patch(`/gallery/${editItem._id}`, data);
    } else {
      await API.post('/gallery', data);
    }

    setFormData({ name: '', date: '', status: '', sizeSqFt: '', clientDetails: '' });
    setImages([]);
    onUpload();
  };

  return (
    <div className='gallerform'>
      <h1 className='formheading'>{editItem ? 'Update Project' : 'Add New Project'}</h1>
      <form onSubmit={handleSubmit}>
        <div className='details'>
          <input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
          <input name="date" title='Date Commenced' type="date" value={formData.date} onChange={handleChange} required />
          <input name="sizeSqFt" placeholder="SqFt Size" value={formData.sizeSqFt} onChange={handleChange} required />
          <input name="clientDetails" placeholder="Client" value={formData.clientDetails} onChange={handleChange} required />
        </div>

        <div className='selectimagesubmit'>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option>Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>

          <input type="file" multiple accept="image/*" onChange={handleImageChange} />

          {/* Image previews with remove button */}
          <div className="image-preview-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {images.map(({ preview }, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <button className='submitbtn' type="submit">
            {editItem ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GalleryForm;


