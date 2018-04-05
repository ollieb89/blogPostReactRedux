import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick(props) {
    this.props.deletePost(this.props.params.id)
    .then(() => {
      // blog post has been deleted navigate the user to the index
      // We navigate by calling this.context.router.push with the new path
      // to navigate to.
      this.context.router.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if(!post) {
      return <div>Loading...</div>;
    }

    return (
      <div className="post-show">
        <div className="pull-xs-right"><Link to="/">Back to index</Link></div>
        <h3>{post.title}</h3>
        <h6><em>Categories: {post.categories}</em></h6>
        <p>{post.content}</p>
        <button
          className="btn btn-danger pull-xs-left"
          onClick={this.onDeleteClick.bind(this)}>
          Delete post
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
