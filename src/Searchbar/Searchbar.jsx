import React, { useState } from 'react';
import T from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, handleQuery] = useState('');

  const onChange = e => {
    handleQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
    handleQuery('');
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm}>
        <button
          type="submit"
          className={styles.searchFormButton}
          onClick={handleSubmit}
        >
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: T.func.isRequired,
};

export default Searchbar;
