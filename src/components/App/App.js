import React, { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import fetchImages from 'components/Api';
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import { Wrapper, Message, Image } from './App.styled'
import Modal from "components/Modal";
import Searchbar from 'components/Searchbar';

export default function App () {
  const[images, setImages] = useState([])
  const[searchImg, setSearchImg] = useState()
  const[page, setPage] = useState(1)
  const[loadMore,  setLoadMore] = useState(true)
  const[loading, setLoading] = useState(false)
  const[error, setError] = useState(null)
  const[showModal, setShowModal] = useState(false)
  const[modalUrl, setModalUrl] = useState('')

  useEffect (() =>{
    if (searchImg === '') {
      return;
    } else {
    setLoading(true); 
      fetchImages(searchImg, page)
      .then(response => {
        if (response.hits.length<12){
          setLoadMore(false)
          }
          setImages(prevState => [...prevState, ...response.hits]);
          setImages(response.hits)         
        })
      .catch(error=>setError(error),
      )            
      .finally(()=> setLoading(false)) }         
  }, [loadMore, page, searchImg])

  const handleFormSubmit = searchQuery => {
    setPage(1);
    setImages([]);
    setSearchImg(searchQuery);
  };

  const handleOnClickMoreButton = e => {
    e.preventDefault();
    setPage(prevState => prevState.page + 1,
    )
  }

  const toggleModal = ()=> {
    setShowModal(({showModal}) =>!showModal,
    )
  }

  const openModal = largeImageURL => {
    setModalUrl( largeImageURL);
    toggleModal();
  }


    return (       
<Wrapper>
  <Searchbar onSubmit={handleFormSubmit}/>
    {error && <h1>Change query</h1>}
    {loading && <ThreeCircles/>}
    {!searchImg && <Message>Enter a request</Message>}
    {images && <ImageGallery 
      images={images} 
      onClickImage ={openModal}/>}
    {showModal && (
      <Modal onCloseModal={toggleModal}>
        <Image src={modalUrl} alt='large'></Image>
      </Modal>
    )}
    {images.length>0 &&
      (<Button onClick = {handleOnClickMoreButton} onLoadMoreBtn={loadMore}>LoadMore</Button>
    )}   
</Wrapper>    
      );
    
  }
 
   /* <Toaster autoClose={3000}/> */
