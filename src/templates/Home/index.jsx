import { useState, useEffect, useCallback } from 'react'



import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../functions/load.posts'

import './styles.css'


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length

  const filterPosts = !!searchValue ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    })
    : posts;

  const handleLoadPosts = useCallback (async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(()=>{
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]); 

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}
        <TextInput handleChange={handleChange} searchValue={searchValue}
        />
      </div>
      {filterPosts.length > 0 && (
        <Posts posts={filterPosts} />
      )}
      {filterPosts.length === 0 && (
        <p>Nenhum resultado encontrado</p>
      )}
      <div className='button-container'>
        {!searchValue && (
          <Button text='Load More'
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
}
export default Home;