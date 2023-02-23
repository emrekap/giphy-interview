import { formatQueryParams } from '../utils/url'
import { SEARCH_V1_ENDPOINT } from '../consts'
import { useRef, useState } from 'react';
import GifImage from '../components/GifImage';
import styles from '../styles/Home.module.css';
import config from '../config';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const searchTimeoutRef = useRef();
  const [pagination, setPagination] = useState({
    offset: 0,
  });

  const handleSearch =
    async (input, offset) => {
      try {
        const queryParams = {
          api_key: config.apiKey,
          q: input || searchInput,
          limit: 5,
          offset
        }

        const endpoint = `${config.apiBaseUrl}${SEARCH_V1_ENDPOINT}${formatQueryParams(queryParams)}`
        const result = await fetch(endpoint, {}).then((res) => res.json());

        if (offset === 0) {
          // user search input changed!
          setData(result.data);
        } else {
          // same search input, next page
          setData([...data, ...result.data]);
        }
        setPagination({ offset: result.pagination.offset })
      } catch (error) {
        console.log(error);
      }

    }


  const handleSearchInputChange =
    (e) => {
      setSearchInput(e.target.value);
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = setTimeout(async () => {
        await handleSearch(e.target.value, 0)
      }, 1000);
    }

  const handleNextPage =
    () => {
      handleSearch(null, pagination.offset + 5)
    }

  const handleKeyPress =
    (e) => {
      if (e.key === 'Enter') {
        clearTimeout(searchTimeoutRef.current)
        handleSearch(e.target.value, 0)
      }
    }


  return (
    <div className={styles.container}>
      <div className={styles['input-container']}>
        <input className={styles['search-input']} value={searchInput} onChange={handleSearchInputChange} onKeyDown={handleKeyPress} />
      </div>

      <div className={styles['grid-container']}>
        {data.map(({ id, images, title }) =>
          <div key={id} className={styles['grid-item ']}>
            <GifImage id={id} image={images['downsized']} alt={title} />
          </div>)
        }
      </div>

      <div className={styles.grid}>

      </div>
      <button onClick={handleNextPage}>Next</button>



      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
