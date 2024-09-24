import { useState } from 'react';
import PropTypes from 'prop-types';
import instance from '../api/axiosSingleton';

const NodeList = ({ nodes, onEdit, onRefresh }) => {
  const deleteNode = async (nid) => {
    try {
      const axios = await instance();
      await axios.delete(`/node/${nid}`);
      onRefresh();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <td>Title</td>
          <td>Content ID</td>
          <td>Operations</td>
        </tr>
      </thead>
      <tbody>
        {nodes.map((node, index) => (
          <tr key={index}>
            <td>
              <a href={node}>{node.title[0].value}</a>
            </td>
            <td>{node.nid[0].value}</td>
            <td>
              <button onClick={() => deleteNode(node.nid[0].value)}>x</button>
              <button onClick={() => onEdit(node)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

NodeList.propTypes = {
  nodes: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default NodeList;
