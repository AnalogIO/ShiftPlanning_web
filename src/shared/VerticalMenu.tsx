import React from 'react';
import { Link } from 'react-router-dom';

import { VerticalMenuItem } from 'shared/types';

interface Props {
  creatingNewItem: boolean;
  isLoading?: boolean;
  items: VerticalMenuItem<any>[];
  newItemString?: string;
  onSearchChange?: Function;
  title?: string;
  newLink?: string;
}

const VerticalMenu = (props: Props) => {
  let searchInput: any;

  const {
    creatingNewItem,
    isLoading,
    items,
    newItemString,
    onSearchChange,
    title,
    newLink,
  } = props;

  const searchBox =
    onSearchChange &&
    <div className="item">
      <div className="ui input">
        <input
          placeholder="Search..."
          ref={input => {
            searchInput = input;
          }}
          onChange={() => onSearchChange(searchInput.value)}
        />
      </div>
    </div>;

  if (isLoading) {
    return (
      <div className="ui secondary vertical pointing fluid menu">
        <div className="ui active centered inline loader" />
      </div>
    );
  }

  return (
    <div
      className="ui secondary vertical pointing fluid menu"
      style={{
        height: 'calc(100vh - 50px)', // 50px should not be hardcoded but determined based on height from top
        overflow: 'scroll',
      }}
    >
      {title &&
        <div
          className="ui basic segment"
          style={{ margin: 0, padding: '0 0 0 1rem' }}
        >
          <h1>Hello</h1>
        </div>}
      {searchBox}
      {creatingNewItem &&
        <Link
          className={`item ${creatingNewItem ? 'active' : ''}`}
          to={newLink ? newLink : ''}
        >
          <strong>
            {newItemString}
          </strong>
        </Link>}
      {items.map((item, index) =>
        <Link
          className={`item ${item.active ? 'active' : ''}`}
          key={item.key || index}
          to={item.link}
        >
          <p>
            <strong>
              {item.title}
            </strong>
            <br />
            {item.subtitle}
          </p>
        </Link>,
      )}
    </div>
  );
};
export default VerticalMenu;
