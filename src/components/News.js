import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin'
import propTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category:'general'
  }

  static propTypes = {
    country: propTypes.string,
    category: propTypes.string,
    pageSize: propTypes.number
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading: true
    }
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01dd55ba1f94dfb80d92974d6b46987&page=1&pageSize=${this.props.pageSize}`
    { this.setState({ loading: true }) }
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata)
    this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })
  }

  handleNextclick = async () => {

    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01dd55ba1f94dfb80d92974d6b46987&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      { this.setState({ loading: true }) }
      let data = await fetch(url);
      let parseddata = await data.json();
      console.log(parseddata)
      // this.setState({ articles: parseddata.articles })

      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
        loading: false
      })
    }
  }

  handlePreclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01dd55ba1f94dfb80d92974d6b46987&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    { this.setState({ loading: true }) }
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata)
    // this.setState({ articles: parseddata.articles })

    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
      loading: false
    })
  }
  render() {
    return (
      <>
        <h2 className='text-center my-3'>NewsMonkey - top headlines</h2>
        {this.state.loading && <Spin />}
        <div className="container" >
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 90) : " "} imgurl={element.urlToImage} newsurl={element.url} />
              </div>
            })}

          </div>
        </div>

        <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.handlePreclick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextclick}>Next &rarr;</button>
        </div>
      </>
    )
  }
}

export default News