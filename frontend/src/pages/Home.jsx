import React, { useState, useEffect } from 'react';
import { Card, FormField, Loader } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post, index) => <Card key={`${post._id}-${index}`} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>
      {title}
    </h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  //useEffect hook for fetching the data that was shared to the community
  useEffect(() => {
    const fetchPosts = async ()=>{
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if(response.ok){
          const result = await response.json();
          setAllPosts(result.data.reverse()); //data.reverse is used for showing the newest data at the top
        }
      } catch (error) {
        alert(error);
      }finally{
        setLoading(false);
      }
    }

    fetchPosts();

  }, []); //empty array means loads one time at start
  
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
    setTimeout(() => {
      const searchResults = allPosts.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

      setSearchedResults(searchResults);
    }, 500)
    );
  }
  

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images created by Dall-E AI
        </p>
      </div>

      <div className='mt-16'>
        <FormField 
          labelName='Search posts'
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No search results found'
                />
              ) : (
                <RenderCards
                data={allPosts}
                  title='No posts found'
                />
              )}
            </div>
          </>
        )}
      </div>

    </section>
  )
}

export default Home