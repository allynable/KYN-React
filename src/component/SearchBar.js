import { useState } from "react";
import { Form, InputGroup, FormControl, Button } from "react-bootstrap";
import  {useNavigate}  from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState(null);
  const navigate = useNavigate();

  const searchStore = (event) => {
    event.preventDefault();
    if(keyword == null){
      navigate("/stores");
    }else{
      navigate(`/stores/${keyword}`);
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <Form className="search" noValidate onSubmit={searchStore}>
      <InputGroup className="search-form">
        <FormControl type="text"
          placeholder="Look for stores"
          name="keyword"
          value={keyword}
          onChange={handleKeywordChange} />
        <Button variant="success" type="submit">Search</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
