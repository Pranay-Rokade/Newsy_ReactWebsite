import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(props) {
    super();
    console.log("I am from constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount() {
    console.log("Component did mount");
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=6ebcb9e24291453f93d4514d9bb348d2&page=1&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6ebcb9e24291453f93d4514d9bb348d2&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
      console.log("You have reached the last page");
    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6ebcb9e24291453f93d4514d9bb348d2&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>Newsy - Top Headlines</h1>
        <div className="row my-2">
        {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        })}
        </div>
        <div className="container my-3 d-flex justify-content-between"> 
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-success" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" className="btn btn-outline-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
