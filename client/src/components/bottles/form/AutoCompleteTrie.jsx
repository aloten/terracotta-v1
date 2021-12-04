import { useState } from 'react';
import styled from 'styled-components';

const StyledAutocomplete = styled.div`
  display: flex;
  flex-direction: column;

  input[type='text'] {
    grid-column: 1;
    grid-row: 1;
    padding: 0.2rem 0.2rem;
    outline: none;
    border-radius: 0;
  }

  .options {
    position: absolute;
    width: 70%;
    display: flex;
    flex-direction: column;
    max-height: 10rem;
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
    background-color: lightgray;
  }
`;

const AutoComplete = ({
  placeholderText,
  required,
  name,
  value,
  searchTrie,
}) => {
  const [state, setState] = useState({
    showOptions: false,
    filteredOptions: [],
    activeOption: 0,
    userInput: value || '',
  });

  const { showOptions, filteredOptions, activeOption, userInput } = state;

  const onChange = (e) => {
    const userInput = e.target.value;
    if (userInput.length >= 2) {
      const filteredOptions = searchTrie(userInput);
      setState({
        showOptions: true,
        filteredOptions,
        activeOption: 0,
        userInput,
      });
    } else {
      setState({
        showOptions: false,
        filteredOptions: [],
        activeOption: 0,
        userInput,
      });
    }
  };

  const onClick = (e) => {
    setState({
      activeOption: 0,
      filteredOptions: [],
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

  // const onFocus = () => {
  //   if (userInput === '') {
  //     setState({ ...state, filteredOptions: [], showOptions: true });
  //   } else {
  //     setState({ ...state, showOptions: true });
  //   }
  // };

  const onBlur = () => {
    setState({ ...state, showOptions: false });
  };

  const onOptionMouseDown = (e) => {
    e.preventDefault();
  };

  let optionList;
  if (showOptions) {
    if (filteredOptions.length > 0) {
      optionList = (
        <ul className='options'>
          {filteredOptions.map((optionName, index) => {
            let className;
            if (index === activeOption) {
              className = 'option-active';
            }
            return (
              <li
                className={className}
                key={optionName}
                onMouseDown={onOptionMouseDown}
                onClick={onClick}
              >
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

  return (
    <StyledAutocomplete>
      <input
        type='text'
        placeholder={placeholderText}
        className='search-box'
        name={name}
        value={userInput}
        onBlur={onBlur}
        // onFocus={onFocus}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
      />
      <div className='search-results'>{optionList}</div>
    </StyledAutocomplete>
  );
};

export default AutoComplete;
