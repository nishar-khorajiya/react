import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews()
  }, []);

  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseddata = await data.json();
    props.setProgress(50)
    console.log(parseddata)
    setArticles(parseddata.articles)
    setLoading(false)
    setTotalResults(parseddata.totalResults)

    props.setProgress(100)
  }


  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
    setPage(page + 1)
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata)
    setArticles(articles.concat(parseddata.articles))
    setTotalResults(parseddata.totalResults)
  };



  const handleNextclick = async () => {
    setPage(page + 1)
    updateNews()
  }

  return (
    <>
      <h3 className='text-center my-3' style={{ margin: '35px opx', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h3>
      {loading && <Spin />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length != totalResults}
        loader={<Spin />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 90) + "..." : " "} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}

          </div>
        </div>
      </InfiniteScroll>


      {/* <div className="container d-flex justify-content-between ">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.handlePreclick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-warning" onClick={this.handleNextclick}>Next &rarr;</button>
        </div> */}
    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: propTypes.string,
  category: propTypes.string,
  pageSize: propTypes.number
}
export default News