
// import DataTable from 'react-data-table-component';
// import API from '../api';

// function GalleryTable({ gallery, onUpdate, onEdit }) {
//   const handleDelete = async (id) => {
//     await API.delete(`/gallery/${id}`);
//     onUpdate();
//   };

//   const handleImageDelete = async (galleryId, imageUrl) => {
//     await API.delete(`/gallery/${galleryId}/image`, {
//       data: { imageUrl },
//     });
//     onUpdate();
//   };

//   const columns = [
//     {
//       name: 'Name',
//       selector: row => row.name,
//       sortable: true,
//     },
//     {
//       name: 'Date',
//       selector: row => new Date(row.date).toDateString(),
//       sortable: true,
//     },
//     {
//       name: 'Status',
//       selector: row => row.status,
//       sortable: true,
//     },
//     {
//       name: 'Size',
//       selector: row => `${row.sizeSqFt} sq ft`,
//       sortable: true,
//     },
//     {
//       name: 'Client',
//       selector: row => row.clientDetails,
//        sortable: true,
//     },
//     {
//       name: 'Images',
//       cell: row => (
//         <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//           {row.images.map((url, i) => (
//             <div key={i} style={{ position: 'relative' }}>
//               <img src={url} alt="img" style={{ width: 60, height: 60, objectFit: 'cover' }} />
//               <button
//                 onClick={() => handleImageDelete(row._id, url)}
//                 style={{
//                   position: 'absolute',
//                   top: 0,
//                   right: 0,
//                   background: 'red',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '50%',
//                   width: 20,
//                   height: 20,
//                   fontSize: 10,
//                   cursor: 'pointer',
//                 }}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       ),
//     },
//     {
//       name: 'Actions',
//       cell: row => (
//         <>
//           <button onClick={() => onEdit(row)}>Edit</button>
//           <button onClick={() => handleDelete(row._id)} style={{ marginLeft: 10 }}>Delete</button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <DataTable
//       title="Gallery Projects"
//       columns={columns}
//       data={gallery}
//       pagination
//       highlightOnHover
//       striped
//       defaultSortFieldId={1}
//     />
//   );
// }

// export default GalleryTable;

import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import API from '../api';

function GalleryTable({ gallery, onUpdate, onEdit }) {
  const [search, setSearch] = useState('');
  const [filteredGallery, setFilteredGallery] = useState(gallery);

  useEffect(() => {
    const result = gallery.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.status.toLowerCase().includes(search.toLowerCase()) ||
      item.clientDetails.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGallery(result);
  }, [search, gallery]);

  const handleDelete = async (id) => {
    await API.delete(`/gallery/${id}`);
    onUpdate();
  };

  const handleImageDelete = async (galleryId, imageUrl) => {
    await API.delete(`/gallery/${galleryId}/image`, {
      data: { imageUrl },
    });
    onUpdate();
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
              <img src={url} alt="img" style={{ width: 60, height: 60, objectFit: 'cover' }} />
              <button
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
          <button onClick={() => onEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row._id)} style={{ marginLeft: 10 }}>Delete</button>
        </>
      ),
    },
  ];

  return (
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
    </div>
  );
}

export default GalleryTable;
