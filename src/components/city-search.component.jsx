import { useContext, useEffect, useRef, useState } from "react";
import { fetchLocationSuggestions } from "../services/location.service";
import { CityContext } from "../context/city.context";

export default function CitySearchComponent() {
  const [query, setQuery] = useState('');
  const [cityList, setCityList] = useState([]);
  const [enableSelection, setEnableSelection] = useState(false);
  
  const suggestionRef = useRef();
  const cityContext = useContext(CityContext);

  const searchCity = (evt) => {
    const searchKey = evt.target.value?.trim()?.length;
    if (!searchKey) {
      setQuery('');
      setCityList('');
    }
    if (searchKey.length < 3) return;
    setQuery(evt.target.value);
    fetchLocationSuggestions(evt.target.value).then(res => {
      const data = res.data.results || []
      setCityList(data);
      if (data.length) setEnableSelection(true);
    })
  }

  const selectCity = (city) => {
    if (!city) {
      setQuery('');
      setEnableSelection(false)
      setCityList([]);
      return;
    }
    cityContext.setCity(city);
    setQuery(`${city.name}, ${city.admin1}, ${city.country_code}`);
    setEnableSelection(false);
  }

  useEffect(() => {
    const handleClick = evt => {
      if (suggestionRef?.current?.classList.contains('visible') && !suggestionRef.current.contains(evt.target)) {
        setEnableSelection(false);
        if (cityContext.city)
          setQuery(`${cityContext.city.name}, ${cityContext.city.admin1}, ${cityContext.city.country_code}`);
      }
    }

    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    }
  }, [suggestionRef.current, cityList.city]);

  return(
    <div className="city-search-component">
      <div className="input-wrapper">
        <input 
          type="text" 
          id="city" 
          placeholder="Search a city" 
          onChange={e => searchCity(e)} 
          value={query} 
          autoComplete="off" 
        />
        { !!query?.length &&
          <button type="button" className="clear" onClick={() => selectCity(undefined)}>
            <span className="material-symbols-outlined">cancel</span>
          </button>
        }
      </div>
      {!!cityList?.length &&
        <div ref={suggestionRef} className={`search-result ${enableSelection ? 'visible' : ''}`}>
          {cityList.map(_city => (
            <div key={_city.id} className="result" onClick={() => selectCity(_city)}>{_city.name}, {_city.admin1}, {_city.country_code}</div>
          ))}
        </div>
      }
    </div>
  );
}