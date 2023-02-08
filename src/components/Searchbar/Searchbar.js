import React, {useState} from "react";
import PropTypes from 'prop-types';
import toast, {Toaster} from 'react-hot-toast';
import { FcSearch } from 'react-icons/fc';
import { IconContext } from "react-icons";
import { Header, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";


export default function Searchbar ({onSubmit}) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChangeInput = e => {
    setSearchQuery(e.target.value) 
    }

  const handleSubmit = e =>{
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.error('Enter a request!');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('')
  }   
  return (
    <Header onSubmit={handleSubmit}>
      <SearchForm>
        <SearchFormButton type="submit">
        <IconContext.Provider value={{ size: '3em', color: "blue", }}>
          <div>
          <FcSearch/>
          </div>
        </IconContext.Provider>              
        </SearchFormButton>          
        <SearchFormInput
          type="text"
          value={searchQuery}
          onChange={handleChangeInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
      <Toaster/>
    </Header>  
  )
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func,
};
