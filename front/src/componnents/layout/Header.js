import React, { Fragment } from 'react'
import "../../App.css"

const Header = () => {
    
    return (
      <Fragment>
          <nav className='navbar row'>
              <div className='col-12 col-md-3'>
                  <div className='navbar-brand'>
                      <img src="./images/BookStore.png" alt="Book Store Group Logo"></img>
                  </div>
              </div>
  
              <div className='col-12 col-md-6 mt-2 mt-md-0'>
                  <div className="input-group">
                      <input 
                          type="text"
                          id="search_field"
                          class="form-control"
                          placeholder='Que producto busca?'></input>
                          <div class="input-group-append">
                              <button id="search-btn" class="btn">
                                  <i class="fa fa-search fa-2x text -white" aria-hidden="true"></i>
                                  
                                  </button>    
                          </div>
                  </div>
              </div>
              <div className="col-10 col-md-3 mt-4 mt-md-0 text-center">
                  <button className="btn" id="login_btn">Iniciar Sesión</button><spam></spam>
                  &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  <i class="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <span className="ml-1" id="cart_count">4</span>
              </div>
         </nav>
         <navig class="navbar row text-center">
         <a class="link_user col-12 col-md-2" href="local">Incio</a>
         <a class="link_user col-12 col-md-2" href="local" >Courses</a>
         <a class="link_user col-12 col-md-2" href="local" >Books</a>
         <a class="link_user col-12 col-md-2" href="local" >Dictionary</a>
         <a class="link_user col-12 col-md-2" href="local" >Conversation Class</a>
         </navig>
            
  
        
  
      </Fragment>
    )
  }
  
  export default Header