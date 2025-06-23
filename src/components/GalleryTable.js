import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import API from '../api';
import './GalleryTable.css'

function GalleryTable({ gallery, onUpdate, onEdit }) {
  const [search, setSearch] = useState('');
  const [filteredGallery, setFilteredGallery] = useState(gallery);
  const [previewImage, setPreviewImage] = useState(null); // { url, galleryId }


  useEffect(() => {
    const result = gallery.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.clientDetails.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGallery(result);
  }, [search, gallery]);

  const handleDelete = async (id) => {
    try{
      let confirm=window.confirm("Are You Sure Want to Delete the Image ?")
      if(confirm){
       const response= await API.delete(`/gallery/${id}`);
       alert(response.data.message)
       onUpdate();
      }
    }
    catch(err){
      console.log(err)
    }
    
  };

  const handleImageDelete = async (galleryId, imageUrl) => {
    const confirm=window.confirm("Are you Sure want to delete?")
    if(confirm){
      const response= await API.delete(`/gallery/${galleryId}/image`, {
      data: { imageUrl },
    });
    alert(response.data.message)
    onUpdate();
    }
   
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => new Date(row.date).toDateString(),
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'Size',
      selector: row => `${row.sizeSqFt} sq ft`,
      sortable: true,
    },
    {
      name: 'Client',
      selector: row => row.clientDetails,
      sortable: true,
    },
    {
      name: 'Images',
      cell: row => (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {row.images.map((url, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <img
  src={url}
  alt="img"
  style={{ width: 60, height: 60, objectFit: 'cover', cursor: 'pointer' }}
  onClick={() => setPreviewImage({ url, galleryId: row._id })}
/>

              <button
              title='Delete Image Permanently'
                onClick={() => handleImageDelete(row._id, url)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 10,
                  cursor: 'pointer',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <i title='Edit Details' class="fa-solid fa-pen-to-square" style={{cursor:'pointer',fontSize:'20px'}} onClick={() => onEdit(row)}></i>
          <i title='Delete Details' class="fa-solid fa-delete-left " onClick={() => handleDelete(row._id)} style={{ marginLeft: 10,cursor:'pointer',fontSize:'20px' }}></i>
        </>
      ),
    },
  ];

  return (
    <div className='viewgallery'>
      <h1 className='tableheading'>Project Details</h1>
    <div>
      <input
        type="text"
        placeholder="Search by name, status or client"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: 10,
          padding: 8,
          borderRadius: 4,
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: 300
        }}
      />
      <DataTable
        title="Gallery Projects"
        columns={columns}
        data={filteredGallery}
        pagination
        highlightOnHover
        striped
        defaultSortFieldId={1}
      />
      {previewImage && (
  <div className="image-modal">
    <div className="modal-content">
      <img src={previewImage.url} alt="Preview" />
      <div className="modal-buttons">
        <button

         title='Delete Image Permanently'
          onClick={() => {
            handleImageDelete(previewImage.galleryId, previewImage.url);
            setPreviewImage(null);
          }}
          className="delete-btn"
        >
          Delete Image
        </button>
        <button onClick={() => setPreviewImage(null)} className="close-btn">
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
    </div>
  );
}

export default GalleryTable;
