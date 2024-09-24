import { useState, useEffect } from 'react';
import './App.css';
import NodeForm from './components/NodeForm';
import NodeList from './components/NodeList';
import instance from './api/axiosSingleton';

function App() {
  const [editNode, setEditNode] = useState(null);
  const [nodes, setNodes] = useState([]);

  const getNodes = async () => {
    try {
      const axios = await instance();
      const response = await axios.get('/node/rest/');
      if (response.data) {
        setNodes(response.data);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getNodes();
  }, []);

  const handleEdit = (node) => {
    setEditNode(node);
  };

  const handleSave = () => {
    setEditNode(null);
    getNodes();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://cdn.pixabay.com/photo/2015/09/11/08/48/banner-935470_1280.jpg"
          alt="logo"
        />
        <p>React - Progressively Decoupled / Headless</p>
        <a
          className="App-link"
          href="https://github.com/kalwar/reactjs_drupal"
          target="_blank"
          rel="noopener noreferrer">
          Source Code
        </a>
      </header>
      <main>
        <div className="node-list">
          <h3>Nodes with Title, ContentID and Operation in Drupal</h3>
          <NodeList nodes={nodes} onEdit={handleEdit} onRefresh={getNodes} />
        </div>
        <NodeForm onSave={handleSave} />
        {editNode && <NodeForm nodeData={editNode} onSave={handleSave} />}
      </main>
    </div>
  );
}

export default App;
