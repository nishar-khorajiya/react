import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: propTypes.string,
    category: propTypes.string,
    pageSize: propTypes.number
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0
    }

    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }


  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    { this.setState({ loading: true }) }
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseddata = await data.json();
    this.props.setProgress(50)
    console.log(parseddata)
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading: false
    })
      
    this.props.setProgress(100)
  }


  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata)
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalResults: parseddata.totalResults,
     
    })

  };
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01dd55ba1f94dfb80d92974d6b46987&page=1&pageSize=${this.props.pageSize}`
    // { this.setState({ loading: true }) }
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // console.log(parseddata)
    // this.setState({ articles: parseddata.articles, totalResults: parseddata.totalResults, loading: false })
    this.updateNews()
  }

  handleNextclick = async () => {

    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    // }
    // else {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01dd55ba1f94dfb80d92974d6b46987&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    //   { this.setState({ loading: true }) }
    //   let data = await fetch(url);
    //   let parseddata = await data.json();
    //   console.log(parseddata)
    //   // this.setState({ articles: parseddata.articles })

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parseddata.articles,
    //     loading: false
    //   })
    // }
    this.setState({ page: this.state.page + 1 })
    console.log({ page: this.state.page });
    this.updateNews()
  }

  handlePreclick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a01dd55ba1f94dfb80d92974d6b46987&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // { this.setState({ loading: true }) }
    // let data = await fetch(url);
    // let parseddata = await data.json();
    // console.log(parseddata)
    // // this.setState({ articles: parseddata.articles })

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseddata.articles,
    //   loading: false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }
  render() {
    return (
      <>
        <h3 className='text-center my-3'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
        {this.state.loading && <Spin />}
       
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length != this.state.totalResults}
            loader={<Spin />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 90) + "..." : " "} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                  </div>
                })}

              </div>
            </div>
          </InfiniteScroll>
        

        {/* <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.handlePreclick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News