import react from 'react';
import { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        title: 'O titule exemplo 1',
        body: 'O texto exemplo 1',
      }
    ]
  }


render() {
  const { posts } = this.state;
  return (
    <div>
      {posts.map(post => <h1>{post.title}</h1>)}
    </div>
  );
}
};


export default App
