import React from 'react';

interface Item {
  name: string;
  id: number;
  locked: boolean;
}

interface Props {
  onChange: (items: Item[]) => void;
  onToggleLock?: (items: Item[]) => void;

  items: Item[];
  initial?: number[];
}

interface State {
  selected: Item[];
  value: string;
}

export default class extends React.Component<Props, State> {
  state = {
    selected: [] as Item[],
    value: '',
  };

  init = (props: Props) => {
    const { initial } = props;

    if (!initial) {
      return;
    }

    this.setState(state => ({
      selected: initial.map(id => props.items.find(i => i.id === id)!),
    }));
  };

  componentWillReceiveProps(nextProps: Props) {
    this.init(nextProps);
  }

  componentDidMount() {
    this.init(this.props);
  }

  match = (name: string): Item[] => {
    return this.props.items
      .filter(
        item => this.state.selected.map(i => i.id).indexOf(item.id) === -1,
      )
      .filter(item => item.name.match(new RegExp(name, 'i')));
  };

  handleRemove = (item: Item) => {
    const selected = this.state.selected.filter(i => i.id !== item.id);

    this.setState(state => ({
      selected,
    }));

    this.props.onChange(selected);
  };

  handleToggleLock = (id: number) => {
    const selected = this.state.selected.map(
      item => (id === item.id ? { ...item, locked: !item.locked } : item),
    );

    this.setState(state => ({
      selected,
    }));

    this.props.onToggleLock!(selected.filter(i => i.locked));
  };

  handleChange = (item: Item) => {
    if (!item) {
      return;
    }

    const selected = this.state.selected.concat(item);

    this.setState(state => ({
      selected,
      value: '',
    }));

    this.props.onChange(selected);
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    this.setState(state => ({
      value,
    }));
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const DELETE_KEY = 8;
    const target = event.target as HTMLInputElement;

    if (event.keyCode !== DELETE_KEY || target.value.length !== 0) {
      return;
    }

    const selected = this.state.selected.slice(0, -1);

    this.setState(state => ({
      selected,
    }));

    this.props.onChange(selected);
  };

  render() {
    const locked = (item: Item) =>
      item.locked ? 'lock icon' : 'unlock alternate icon';

    return (
      <div>
        <div style={{ marginBottom: '0.5rem' }}>
          <input
            value={this.state.value}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div>
          {this.state.selected.map(item => (
            <div key={item.id} className="ui label">
              {item.name}
              <i
                className="delete icon"
                onClick={() => this.handleRemove(item)}
              />
              {this.props.onToggleLock && (
                <i
                  className={locked(item)}
                  style={{ marginLeft: '1rem' }}
                  onClick={() => this.handleToggleLock(item.id)}
                />
              )}
            </div>
          ))}
        </div>
        {this.state.value.length >= 2 && (
          <div
            style={{
              listStyleType: 'none',
              boxShadow: '.05em .01em .5em rgba(0,0,0,.2)',
              background: 'white',
              width: '220px',
              padding: 0,
              margin: 0,
              position: 'fixed',
              zIndex: 10000,
            }}
          >
            {this.match(this.state.value).map(item => (
              <div
                style={{
                  borderBottom: '1px solid #ddd',
                  padding: '10px 5px',
                  margin: 0,
                }}
                key={item.id}
                onClick={() => this.handleChange(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
