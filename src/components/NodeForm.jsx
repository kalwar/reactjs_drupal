import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import instance from '../api/axiosSingleton';

const NodeForm = ({ nodeData, onSave }) => {
  const [data, setData] = useState({ title: '', body: '' });

  useEffect(() => {
    if (nodeData) {
      setData({
        title: nodeData.title[0].value,
        body: nodeData.body[0].value,
      });
    }
  }, [nodeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const node = {
      type: [
        {
          target_id: 'article',
          target_type: 'node_type',
        },
      ],
      title: [
        {
          value: data.title,
        },
      ],
      body: [
        {
          value: data.body,
          format: 'plain_text',
        },
      ],
    };
    try {
      const axios = await instance();
      if (nodeData) {
        await axios.patch(`/node/${nodeData.nid[0].value}`, node);
      } else {
        await axios.post('/node/', node);
      }
      onSave();
    } catch (e) {
      alert(e);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <div className="create-node-form">
      <h4>{nodeData ? 'Edit Node' : 'Create Node'} Form</h4>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
        <br />
        <label>Body</label>
        <br />
        <textarea
          id="body"
          value={data.body}
          onChange={handleChange}></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

NodeForm.propTypes = {
  nodeData: PropTypes.shape({
    title: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
    body: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
      })
    ),
    nid: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      })
    ),
  }),
  onSave: PropTypes.func.isRequired,
};

export default NodeForm;
