import React from 'react';
import Link from 'redux-first-router-link';

import { VerticalMenuItem } from 'shared/types';
import SearchBox from 'shared/SearchBox';

interface Props {
  creatingNewItem: boolean;
  isLoading?: boolean;
  items: VerticalMenuItem<any>[];
  newItemString?: string;
  onSearchChange?: (value: string) => void;
  title?: string;
  newLink?: string;
}

interface State {
  search: string;
}

export default class VerticalMenu extends React.Component<Props, State> {
  state = { search: '' };
  handleSearch = (search: string) => {
    this.setState({ search: search.toLowerCase() });
  };

  render() {
    let searchInput: HTMLInputElement;

    const {
      creatingNewItem,
      isLoading,
      items,
      newItemString,
      onSearchChange,
      title,
      newLink,
    } = this.props;

    const searchBox = onSearchChange && (
      <div className="item">
        <div className="ui input">
          <input
            placeholder="Search..."
            ref={input => (searchInput = input!)}
            onChange={() => onSearchChange(searchInput.value)}
          />
        </div>
      </div>
    );

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
        {title && (
          <div
            className="ui basic segment"
            style={{ margin: 0, padding: '0 0 0 1rem' }}
          >
            <h1>Hello</h1>
          </div>
        )}
        <div style={{ padding: '1em 1em 0 1em' }}>
          <SearchBox onSearch={this.handleSearch} />
        </div>
        {creatingNewItem && (
          <Link className="item" to={newLink ? newLink : ''}>
            {newItemString}
          </Link>
        )}
        {items
          .filter(item => item.title.toLowerCase().includes(this.state.search))
          .map((item, index) => (
            <Link
              className={`item ${item.active ? 'active' : ''}`}
              key={item.key || index}
              to={item.link}
            >
              <p>
                <strong>{item.title}</strong>
                <br />
                {item.subtitle}
              </p>
            </Link>
          ))}
      </div>
    );
  }
}
