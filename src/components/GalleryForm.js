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
      <br/><br/>
      <form onSubmit={handleSubmit}>
        <div className='details'>
          <input name="name" title='Enter Name of The Project' placeholder="Enter Project Name" value={formData.name} onChange={handleChange} required />
          <input name="date" title='Select Date Commenced' type="date" value={formData.date} onChange={handleChange} required />
          <input name="clientDetails" title='Enter Name of The Client' placeholder="Enter Your Client Name" value={formData.clientDetails} onChange={handleChange} required />
        </div>
<br/>
        
{/* Image previews with remove button */}
          <div style={{display:'flex'}}>
          
          <br/><br/>
          <div className="image-preview-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {
            images.length == 0 
            ? 
            <img
            src=''
            alt={`Select Project Images`}
            style={{ width: '250px' }}
          />
            :
            images.map(({ preview }, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{ width: '70px' }}
                />
                
                <button
                title='Deselect the Image'
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
          </div>
          <input type="file" title='Select Project Images ' multiple accept="image/*" id='File1' onChange={handleImageChange} />

          <br/><br/><br/>
          
          <div className='selectimagesubmit'>
          <input name="sizeSqFt" title='Enter the size of the project in Sqft' placeholder="Enter Project Size (SqFt)" value={formData.sizeSqFt} onChange={handleChange} required />
          <select name="status" title='Select the Status of the Project' value={formData.status} onChange={handleChange} required>
            <option>Select Project Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
          </select>
          <button className='submitbtn' type="submit">
            {editItem ? 'Update' : 'Save'}
          </button>
        </div>
        <br/>  <br/>
      </form>
    </div>
  );
}

export default GalleryForm;


