import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  
  const CaptitalizeFirstChar=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    // document.title = `${CaptitalizeFirstChar(props.category)}`;
  
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    setArticles(parseData.articles);
    setLoading(false)
    setTotalResults(parseData.totalResults)
    props.setProgress(100);
  };

  useEffect(() => {
    document.title=`${CaptitalizeFirstChar(props.category)} -DailyBin`
    updateNews(); 
    // eslint-disable-next-line
}, [])

  
 
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pagesize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    
     setArticles(articles.concat(parseData.articles))
      setTotalResults(parseData.totalResults)
  
  };

  // const handlePrevious = async () => {
  //   setPage(page - 1 );
  //   updateNews();
  // };

  // const handleNext = async () => {
  //   setPage(page +1 );
  //   updateNews();
  // };

  
    return (
      <>
        <h1 className="text-center" style={{margin: '90px 0px 30px 0px'}}>
          DailyBin-{CaptitalizeFirstChar(props.category)} Top
          Headlines
        </h1>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-3">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-2" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/05/google-bard-on-smartphone-feature.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
            }
            

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};
 News.defaultProps = {
  country: "in",
  pagesize: 5,
  category: "general",
};

export default News;
