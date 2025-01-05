import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6ebcb9e24291453f93d4514d9bb348d2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1})
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{margin: '35px 0px'}}>Newsy - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row my-2">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div>
        })}
        </div>
        <div className="container my-3 d-flex justify-content-between"> 
        <button disabled={this.state.page<=1} type="button" className="btn btn-outline-success" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
