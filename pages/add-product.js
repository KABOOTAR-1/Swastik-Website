import React, { useState } from 'react';
import Head from 'next/head';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { IKUpload } from 'imagekitio-react';
import imageCompression from 'browser-image-compression';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    category: '',
    price: '',
    features: '',
    applications: '',
    models: [{ name: '', specs: [{ label: '', value: '' }] }]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [compressingImage, setCompressingImage] = useState(false);

  // Client-side image compression
  const compressImage = async (file) => {
    console.log('🗜️  [Client-Side] Starting image compression...');
    console.log(`   📁 Original file: ${file.name}`);
    console.log(`   📊 Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    const startTime = performance.now();

    const options = {
      maxSizeMB: 0.5, // Max file size: 500 KB
      maxWidthOrHeight: 1920, // Max dimension: 1920px
      useWebWorker: true, // Use web worker for better performance
      fileType: 'image/webp', // Convert to WebP for better compression
      initialQuality: 0.8 // 80% quality
    };

    try {
      const compressedFile = await imageCompression(file, options);

      const endTime = performance.now();
      const compressionTime = ((endTime - startTime) / 1000).toFixed(2);
      const compressionRatio = ((1 - compressedFile.size / file.size) * 100).toFixed(1);

      console.log('✅ [Client-Side] Compression successful!');
      console.log(`   📊 Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   📉 Reduction: ${compressionRatio}%`);
      console.log(`   ⏱️  Compression time: ${compressionTime} seconds`);
      console.log(`   🚀 Upload will be ${compressionRatio}% faster!`);

      return compressedFile;
    } catch (error) {
      console.error('❌ [Client-Side] Compression failed:', error);
      console.log('⚠️  Will upload original file');
      return file; // Return original if compression fails
    }
  };

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

  const uploadImageToImageKit = async (file) => {
    console.log('📤 [ImageKit] Starting image upload...');
    console.log(`   📁 File: ${file.name}`);
    console.log(`   📊 Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

    const startTime = performance.now();

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('folder', '/products'); // Organize in products folder

      // Get authentication parameters
      fetch('/api/imagekit-auth')
        .then(res => res.json())
        .then(auth => {
          formData.append('signature', auth.signature);
          formData.append('expire', auth.expire);
          formData.append('token', auth.token);
          formData.append('publicKey', 'public_Ov6emI8Heo9zwhCL3fisp5zmMk8=');

          // Upload to ImageKit
          return fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
              'Authorization': 'Basic ' + btoa('private_9g8G+/Inx2/KGc15ZwB6s62sHhA=' + ':')
            },
            body: formData
          });
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to upload image to ImageKit');
          }
          return response.json();
        })
        .then(data => {
          const endTime = performance.now();
          const uploadTime = ((endTime - startTime) / 1000).toFixed(2);

          console.log('✅ [ImageKit] Image uploaded successfully!');
          console.log(`   ⏱️  Upload time: ${uploadTime} seconds`);
          console.log(`   🔗 URL: ${data.url}`);
          console.log(`   📦 File ID: ${data.fileId}`);
          console.log(`   📏 Dimensions: ${data.width}x${data.height}px`);

          // Return the filePath (not full URL) - we'll use IKImage to display
          resolve({
            url: data.url,
            filePath: data.filePath, // This is what we'll store in Firestore
            fileId: data.fileId,
            width: data.width,
            height: data.height
          });
        })
        .catch(error => {
          const endTime = performance.now();
          const uploadTime = ((endTime - startTime) / 1000).toFixed(2);

          console.error('❌ [ImageKit] Upload failed');
          console.error(`   ⏱️  Failed after: ${uploadTime} seconds`);
          console.error(`   Error:`, error);
          reject(error);
        });
    });
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
        // Step 1: Compress image client-side
        setCompressingImage(true);
        console.log('🗜️  Step 1: Compressing image on your device...');
        const compressedImage = await compressImage(formData.image);
        setCompressingImage(false);

        // Step 2: Upload compressed image to ImageKit
        setUploadingImage(true);
        console.log('📤 Step 2: Uploading compressed image to ImageKit...');

        const imageKitData = await uploadImageToImageKit(compressedImage);
        imageUrl = imageKitData.url; // Store full URL (works for both IKImage and regular img)

        console.log('✅ Upload complete! URL:', imageUrl);
        console.log('🎉 Image is now: Compressed → Uploaded → Optimized by ImageKit!');
        setUploadingImage(false);
      }

      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'products'), {
        ...formData,
        image: imageUrl, // Single field: full URL (works with ImageKitImage component)
        price: parseFloat(formData.price) || 0,
        features: formData.features.split(',').map(f => f.trim()),
        applications: formData.applications.split(',').map(a => a.trim()),
        models: formData.models.filter(model => model.name.trim() !== ''),
        createdAt: new Date()
      });

      setMessage(`✅ Product added successfully with ID: ${docRef.id}`);
      console.log('🎉 Product saved to Firestore with ImageKit image!');

      setFormData({
        name: '',
        description: '',
        image: null,
        category: '',
        price: '',
        features: '',
        applications: '',
        models: [{ name: '', specs: [{ label: '', value: '' }] }]
      });
      setImagePreview('');
    } catch (error) {
      console.error('❌ Error adding product:', error);
      setMessage('❌ Error adding product. Please try again.');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add Product - Internal</title>
      </Head>
      <style jsx>{`
        .container {
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .spec-row {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .spec-input {
          flex: 1;
          padding: 8px;
          min-width: 0;
          box-sizing: border-box;
        }
        
        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          flex-shrink: 0;
          min-width: 32px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .spec-label-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .spec-label-container label {
          margin: 0;
          flex-shrink: 0;
        }
        
        @media (max-width: 600px) {
          .container {
            padding: 10px;
          }
          
          .spec-row {
            gap: 5px;
          }
          
          .spec-input {
            padding: 6px;
            font-size: 14px;
          }
          
          .delete-btn {
            padding: 6px;
            min-width: 28px;
            height: 36px;
            font-size: 16px;
          }
          
          .spec-label-container {
            gap: 8px;
          }
        }
        
        @media (max-width: 400px) {
          .spec-input {
            padding: 5px;
            font-size: 13px;
          }

          .delete-btn {
            padding: 5px;
            min-width: 26px;
            height: 34px;
          }

          .spec-row {
            flex-direction: column;
            gap: 5px;
          }

          .spec-input {
            width: 100%;
          }
        }
      `}</style>
      <div className="container">

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
            {compressingImage && (
              <p style={{ marginTop: '10px', color: '#ff9800', fontWeight: 'bold' }}>
                🗜️  Compressing image on your device...
              </p>
            )}
            {uploadingImage && (
              <p style={{ marginTop: '10px', color: '#007bff', fontWeight: 'bold' }}>
                📤 Uploading compressed image to ImageKit...
              </p>
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
              placeholder="Heavy-duty construction for multistory buildings, Advanced safety mechanisms, Ergonomic control panel"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div>
            <label htmlFor="applications">Applications (comma-separated):</label>
            <input
              type="text"
              id="applications"
              name="applications"
              value={formData.applications}
              onChange={handleChange}
              placeholder="Concrete floor slabs, Foundation work, Large construction projects"
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
                  <div className="spec-label-container">
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
                    <div key={specIndex} className="spec-row">
                      <input
                        type="text"
                        placeholder="Label (e.g., Capacity)"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(modelIndex, specIndex, 'label', e.target.value)}
                        className="spec-input"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g., 200L)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(modelIndex, specIndex, 'value', e.target.value)}
                        className="spec-input"
                      />
                      {model.specs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSpec(modelIndex, specIndex)}
                          className="delete-btn"
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
    </>
  );
}