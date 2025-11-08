import React, { useState } from 'react';
import Head from 'next/head';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    category: '',
    price: '',
    features: '',
    models: [{ name: '', specs: [{ label: '', value: '' }] }]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', 'c391e5235b9f0906fe380224c395aec8');

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.data.url;
  };

  const handleModelChange = (index, field, value) => {
    const updatedModels = [...formData.models];
    updatedModels[index][field] = value;
    setFormData(prev => ({
      ...prev,
      models: updatedModels
    }));
  };

  const handleSpecChange = (modelIndex, specIndex, field, value) => {
    const updatedModels = [...formData.models];
    updatedModels[modelIndex].specs[specIndex][field] = value;
    setFormData(prev => ({
      ...prev,
      models: updatedModels
    }));
  };

  const addModel = () => {
    setFormData(prev => ({
      ...prev,
      models: [...prev.models, { name: '', specs: [{ label: '', value: '' }] }]
    }));
  };

  const removeModel = (index) => {
    if (formData.models.length > 1) {
      setFormData(prev => ({
        ...prev,
        models: prev.models.filter((_, i) => i !== index)
      }));
    }
  };

  const addSpec = (modelIndex) => {
    const updatedModels = [...formData.models];
    updatedModels[modelIndex].specs.push({ label: '', value: '' });
    setFormData(prev => ({
      ...prev,
      models: updatedModels
    }));
  };

  const removeSpec = (modelIndex, specIndex) => {
    const updatedModels = [...formData.models];
    if (updatedModels[modelIndex].specs.length > 1) {
      updatedModels[modelIndex].specs = updatedModels[modelIndex].specs.filter((_, i) => i !== specIndex);
      setFormData(prev => ({
        ...prev,
        models: updatedModels
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';

      // Upload image if selected
      if (formData.image) {
        setUploadingImage(true);
        imageUrl = await uploadImage(formData.image);
        setUploadingImage(false);
      }

      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'products'), {
        ...formData,
        image: imageUrl,
        price: parseFloat(formData.price) || 0,
        features: formData.features.split(',').map(f => f.trim()),
        models: formData.models.filter(model => model.name.trim() !== ''),
        createdAt: new Date()
      });

      setMessage(`Product added successfully with ID: ${docRef.id}`);
      setFormData({
        name: '',
        description: '',
        image: null,
        category: '',
        price: '',
        features: '',
        models: [{ name: '', specs: [{ label: '', value: '' }] }]
      });
      setImagePreview('');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product. Please try again.');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Head>
        <title>Add Product - Internal</title>
      </Head>

      <h1>Add New Product</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
          {imagePreview && (
            <div style={{ marginTop: '10px' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          )}
          {uploadingImage && (
            <p style={{ marginTop: '10px', color: '#007bff' }}>Uploading image...</p>
          )}
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="features">Features (comma-separated):</label>
          <input
            type="text"
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Feature 1, Feature 2, Feature 3"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        {/* Models Section */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px' }}>
          <h3>Product Models</h3>
          {formData.models.map((model, modelIndex) => (
            <div key={modelIndex} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4>Model {modelIndex + 1}</h4>
                {formData.models.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeModel(modelIndex)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove Model
                  </button>
                )}
              </div>

              <div style={{ marginBottom: '10px' }}>
                <label>Model Name:</label>
                <input
                  type="text"
                  value={model.name}
                  onChange={(e) => handleModelChange(modelIndex, 'name', e.target.value)}
                  placeholder="e.g., Model A, Standard, Premium"
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label>Specifications:</label>
                  <button
                    type="button"
                    onClick={() => addSpec(modelIndex)}
                    style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Add Spec
                  </button>
                </div>

                {model.specs.map((spec, specIndex) => (
                  <div key={specIndex} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Label (e.g., Capacity)"
                      value={spec.label}
                      onChange={(e) => handleSpecChange(modelIndex, specIndex, 'label', e.target.value)}
                      style={{ flex: 1, padding: '8px' }}
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g., 200L)"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(modelIndex, specIndex, 'value', e.target.value)}
                      style={{ flex: 1, padding: '8px' }}
                    />
                    {model.specs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSpec(modelIndex, specIndex)}
                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addModel}
            style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Add Another Model
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
          color: message.includes('Error') ? '#721c24' : '#155724',
          borderRadius: '4px'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}