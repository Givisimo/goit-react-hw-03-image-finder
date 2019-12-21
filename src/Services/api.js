const fetchImgs = (query, pageNumber) => {
  const url = `https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=13083480-36e6529ec243ccac1724af6b3&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url)
    .then(res => res.json())
    .then(data => data.hits);
};

export default {
  fetchImgs,
};
