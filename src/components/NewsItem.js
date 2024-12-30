import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <div className='=my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={!imageUrl?"https://cdn.mos.cms.futurecdn.net/jbYLgds7hSgDgRLawETMe6-1200-80.gif":imageUrl}className="card-img-top"alt="..." />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}...</p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-success">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
