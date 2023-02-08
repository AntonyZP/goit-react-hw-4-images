import React, { Component } from "react";
import fetchImages from 'components/Api';
import Searchbar from "components/Searchbar";
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import { Wrapper, Message, Image } from './App.styled'
import { ThreeCircles } from "react-loader-spinner";
import Modal from "components/Modal";

export default class App extends Component {
  state ={
    images: [],
    searchImg: '',
    page: 1,
    loadMore: true,
    loading: false,
    error: null,
    showModal: false,
    modalUrl: null,
  };
  
  componentDidUpdate(_, prevState) {
    const {searchImg, page} = this.state
    const prevSearchImg = prevState.searchImg;
    const prevPage = prevState.page;
   
    if (prevSearchImg !== searchImg 
      || prevPage !== page
      ) {
        this.setState({loading: true});     
            fetchImages(searchImg, page)
            .then(response => {
              if (page !== prevPage) {
                if (response.hits.length<12){
                  this.setState({loadMore: false})
                }
                this.setState(prevState => ({
                  images: [...prevState.images, ...response.hits],                    
                }));
              } else if 
              (searchImg !== prevSearchImg) {
                this.setState({images: response.hits})
                
                if (response.hits.length<12){
                  this.setState({loadMore: false})
                }
              }
            })
            .catch(error=>this.setState({error: error}),
            )            
            .finally(()=> this.setState({loading: false}))          
        }
    }   

  handleFormSubmit = searchQuery => {
    this.setState({
      page: 1,
      images: [],
      searchImg: searchQuery,
    });
  };

  handleOnClickMoreButton = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  toggleModal = ()=> {
    this.setState(({showModal}) =>({
      showModal: !showModal,
    }))
  }

  openModal = largeImageURL => {
    this.setState({modalUrl: largeImageURL});
    this.toggleModal();
  }

  render () {
    const {images, loading, error, searchImg, loadMore, showModal, modalUrl} = this.state;
    
    return (       
<Wrapper>
  <Searchbar onSubmit={this.handleFormSubmit}/>
    {error && <h1>Change query</h1>}
    {loading && <ThreeCircles/>}
    {!searchImg && <Message>Enter a request</Message>}
    {images && <ImageGallery 
      images={this.state.images} 
      onClickImage ={this.openModal}/>}
    {showModal && (
      <Modal onCloseModal={this.toggleModal}>
        <Image src={modalUrl} alt='large'></Image>
      </Modal>
    )}
    {images.length>0 &&
      (<Button onClick = {this.handleOnClickMoreButton} onLoadMoreBtn={loadMore}>LoadMore</Button>
    )}
   
</Wrapper>    
      );
    }
  }
 
   /* <Toaster autoClose={3000}/> */
