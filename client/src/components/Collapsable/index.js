import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Collapsable.module.css';

class Collapsable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen
    };
  }

  toggleState = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  titleClick = () => {
    if (this.props.clickableTitle) this.toggleState();
  };

  render() {
    return (
      <div style={{ ...this.props.style }} className={styles.container}>
        <div onClick={this.titleClick} className={styles.title}>
          <i
            onClick={this.toggleState}
            style={{
              fontSize: '1rem',
              marginRight: '0.5rem',
              marginLeft: '0.5rem',
              opacity: '0.5',
              whiteSpace: 'nowrap'
            }}
            className={
              this.state.isOpen
                ? 'fas fa-chevron-circle-down'
                : 'fas fa-chevron-circle-right'
            }
          />
          {this.props.title}
        </div>
        <div
          className={this.state.isOpen ? styles.uncollapsed : styles.collapsed}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Collapsable;

Collapsable.defaultProps = {
  isOpen: false,
  clickableTitle: true
};
Collapsable.propTypes = {
  clickableTitle: PropTypes.bool,
  style: PropTypes.object,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool
};
