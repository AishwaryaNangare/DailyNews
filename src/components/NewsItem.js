import React from "react";

const NewsItem =(props)=> {
  
    let { title, description, imgUrl, newsUrl, date, author, source } = props;
    return (
      <div>
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger"> {source} </span>
          </div>

          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <footer className="blockquote-footer">
              by <cite title="Source Title">{author ? author : "unknown"}</cite>{" "}
              on {new Date(date).toGMTString()}
            </footer>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn-sm btn btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
