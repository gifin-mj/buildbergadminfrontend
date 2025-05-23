 import API from '../api';
function GalleryItem({ item, onUpdate, onEdit }) {
  const handleDelete = async () => {
    await API.delete(`/gallery/${item._id}`);
    onUpdate();
  };

  const handleEdit = () => {
    onEdit(item);
  };

  const handleImageDelete = async (url) => {
    await API.delete(`/gallery/${item._id}/image`, {
      data: { imageUrl: url },
    });
    onUpdate(); // Refresh
  };

  return (
    <div style={{ border: '1px solid black', marginBottom: 10, padding: 10 }}>
      <h3>{item.name}</h3>
      <p>Date: {new Date(item.date).toDateString()}</p>
      <p>Status: {item.status}</p>
      <p>Size: {item.sizeSqFt} sq ft</p>
      <p>Client: {item.clientDetails}</p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {item.images.map((url, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img src={url} alt="Project" style={{ width: 150, height: 'auto' }} />
            <button
              onClick={() => handleImageDelete(url)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default GalleryItem;

// function GalleryItem({ item, onUpdate, onEdit }) {
//   const handleDelete = async () => {
//     await API.delete(`/gallery/${item._id}`);
//     onUpdate();
//   };

//   const handleEdit = () => {
//     onEdit(item); 
//   };

//   return (
//     <div style={{ border: '1px solid black', marginBottom: 10, padding: 10 }}>
//       <h3>{item.name}</h3>
//       <p>Date: {new Date(item.date).toDateString()}</p>
//       <p>Status: {item.status}</p>
//       <p>Size: {item.sizeSqFt} sq ft</p>
//       <p>Client: {item.clientDetails}</p>
//       <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//         {item.images.map((url, i) => (
//           <img key={i} src={url} alt="Project" style={{ width: 150, height: 'auto' }} />
//         ))}
//       </div>
//       <button onClick={handleEdit}>Edit</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// }
// export default GalleryItem;

