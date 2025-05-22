import API from '../api';
function GalleryItem({ item, onUpdate, onEdit }) {
  const handleDelete = async () => {
    await API.delete(`/gallery/${item._id}`);
    onUpdate();
  };

  const handleEdit = () => {
    onEdit(item); // 👈 send this item to the form
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
          <img key={i} src={url} alt="Project" style={{ width: 150, height: 'auto' }} />
        ))}
      </div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
export default GalleryItem;

// function GalleryItem({ item, onUpdate }) {
//   const handleDelete = async () => {
//     await API.delete(`/gallery/${item._id}`);
//     onUpdate();
//   };
//   const handleEdit=async()=>{

//   }

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

