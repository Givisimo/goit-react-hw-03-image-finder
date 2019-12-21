import React, { Component } from 'react';
import styles from './Searchbar.module.css'

class Searchbar extends Component {
  state = {
    query: '',
  };

  onChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.searchForm}>
          <button
            type="submit"
            className={styles.searchFormButton}
            onClick={this.handleSubmit}
          >
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
