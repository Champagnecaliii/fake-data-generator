import React, { useEffect, useRef } from 'react';

const UserDataTable = ({ data }) => {
    const tableRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
          if (
            tableRef.current &&
            tableRef.current.getBoundingClientRect().bottom <= window.innerHeight
          ) {
            console.log('Load more data...');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      return (
        <table
          ref={tableRef}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            margin: '20px 0',
          }}
        >
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Index</th>
              <th style={tableHeaderStyle}>Random Identifier</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Address</th>
              <th style={tableHeaderStyle}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{user.id}</td>
                <td style={tableCellStyle}>{user.name}</td>
                <td style={tableCellStyle}>{user.address}</td>
                <td style={tableCellStyle}>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
    
    const tableHeaderStyle = {
      backgroundColor: '#f2f2f2',
      padding: '10px',
      borderBottom: '1px solid #ddd',
    };
    
    const tableCellStyle = {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    };
    
    const evenRowStyle = {
      backgroundColor: '#f9f9f9',
    };
    
    const oddRowStyle = {
      backgroundColor: '#ffffff',
    };
    
    export default UserDataTable;
