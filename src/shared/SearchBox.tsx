import React from 'react';

interface Props {
  onSearch: (search: string) => void;
}

export default (props: Props) => (
  <div>
    <div className="ui small input icon input fluid">
      <i className="search icon" />
      <input
        onChange={e => props.onSearch(e.target.value)}
        type="text"
        placeholder="Search for name..."
      />
    </div>
    <div
      style={{
        padding: '0.5em 0 0 0',
        fontSize: '0.8em',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <strong>Sort by:</strong>
      <div>
        <a href="#">Name</a>
      </div>
      <div>
        <a href="#">Check-in</a>
      </div>
      <div>
        <a href="#">Title</a>
      </div>
    </div>
  </div>
);
