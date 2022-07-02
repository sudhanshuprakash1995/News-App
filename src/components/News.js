import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
   
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        console.log("Hello I am news component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    }


    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=c25778cf25ea4cb390726c7f22e51f1f&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({loading: true});
        let parseData = await data.json();
        console.log(parseData);
        this.setState({ 
            totalResults: parseData.totalResults,
            articles: parseData.articles,
            loading: false })
    }

    async componentDidMount(){
        console.log("CDM");
        this.updateNews();
    }

    handlePreviousClick = async () => {
        // console.log("Previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=c25778cf25ea4cb390726c7f22e51f1f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // let data = await fetch(url);
        // this.setState({loading: true});
        // let parseData = await data.json();
        // console.log(parseData);
        // this.setState({ 
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
        //     loading: false })
        this.setState({  page: this.state.page - 1 })
        this.updateNews();
    }


    handleNextClick = async () => {
        // console.log("Next");
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
        // {

        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&catagory=${this.props.catagory}&apiKey=c25778cf25ea4cb390726c7f22e51f1f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parseData = await data.json();
        //     console.log(parseData);
        //     this.setState({ 
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading: false })

        // }
        this.setState({  page: this.state.page + 1 })
        this.updateNews();
              
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(Array.from({ length: 20 }))
          });
        }, 1500);
      };


    render() {  

        console.log("render");
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{margin: '35px 0px'}}> NewsMonkey - Top Headlines </h2>
                {/* { this.state.loading && <Spinner /> } */}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
                <div className="row">
                    {this.state.articles.map((element) => { 
                       return <div className="col md-6" key={element.url}>
                            <NewsItem  title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage?element.urlToImage:"https://yt3.ggpht.com/ytc/AKedOLT3EnMXtIOvDT4CL7obl0-acSZCBhMuapXBQFksVQ=s88-c-k-c0x00ffffff-no-rj"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                </InfiniteScroll>
                  
            </div>
        )
    }
}

export default News
