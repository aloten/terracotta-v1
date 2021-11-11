import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledAutocomplete = styled.div`
  .form {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 1rem;
  }

  input[type='text'] {
    grid-column: 1;
    grid-row: 1;
    padding: 0.2rem 0.2rem;
    outline: none;
    border-radius: 0;
    // make this look better
  }

  input[type='submit'] {
    grid-column: 2;
    grid-row: 1;
  }

  .search-results {
    grid-column: 1;
    grid-row: 2;
  }

  .options {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-height: 5rem;
    overflow: scroll;
    border: 1px solid gray;
    border-top: none;
  }

  .options li {
    padding: 0 0.3rem;
    background-color: white;
    border-bottom: 1px solid gray;
  }

  .options li:last-child {
    border-bottom: none;
  }

  .options li:hover,
  .options .option-active {
    background-color: ${(props) => props.theme.colors.bgGrey};
  }
`;

const AutoComplete = ({ options }) => {
  const [state, setState] = useState({
    showOptions: false,
    filteredOptions: [],
    activeOption: 0,
    userInput: '',
  });

  const { showOptions, filteredOptions, activeOption, userInput } = state;

  const onChange = (e) => {
    const userInput = e.target.value;
    const filteredOptions = filter(userInput);
    setState({
      showOptions: true,
      filteredOptions,
      activeOption: 0,
      userInput,
    });
  };

  const onClick = (e) => {
    setState({
      activeOption: 0,
      filteredOption: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
    });
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setState({
        ...state,
        activeOption: 0,
        showOptions: false,
        userInput: filteredOptions[activeOption],
      });
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setState({ ...state, activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      if (activeOption + 1 === filteredOptions.length) {
        return;
      }
      setState({ ...state, activeOption: activeOption + 1 });
    }
  };

  function filter(regex) {
    return options.filter(
      (option) => option.toLowerCase().indexOf(regex.toLowerCase()) > -1
    );
  }

  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length > 0) {
      optionList = (
        <ul className='options'>
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = 'option-active';
            }
            return (
              <li className={className} key={optionName} onClick={onClick}>
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    }
  } else {
    optionList = <div className='no-options'></div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <StyledAutocomplete>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Search for wine to add'
          className='search-box'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
        />
        <div className='search-results'>{optionList}</div>
        <input
          type='submit'
          value='Continue'
          className='btn btn-primary search-btn'
        />
      </form>
    </StyledAutocomplete>
  );
};

AutoComplete.propTypes = {
  options: PropTypes.instanceOf(Array).isRequired,
};

export default AutoComplete;
