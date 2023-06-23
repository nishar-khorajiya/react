import React, { Component } from 'react'
export class NewsItem extends Component {
  render() {

    let { title, description, imgurl, author, date, newsurl,source } = this.props

    return (
      <>
        <div className="my-3">
          <div className="card" >
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}>{source}</span>
            <img src={this.props.imgurl ? this.props.imgurl : "https://c.ndtvimg.com/2023-06/oc2s00h_india-population-bloomberg_625x300_18_June_23.jpg"} className="card-img-top" alt="..." />
            <div className="card-body">

              <h5 className="card-title">{this.props.title}</h5>
              <p className="card-text">{this.props.description}</p>
              <p className='card-text'><small className='text-muted'>By {author ? author : "unkown"} on {new Date(date).toGMTString()}</small> </p>
              <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default NewsItem