import { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import axios from "axios"
import { getTableData } from "./Action/RootAction";

function Home(props) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalpages] = useState(0);
  const dataPerPage = 10;

  useEffect(() => {

    // axios
    //   .get(`https://api.punkapi.com/v2/beers`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    setData( props.dataList);
  }, [props.dataList]);

  useEffect(()=>{
    props.getTableData();
  },[])

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalpages / dataPerPage); i++) {
    pageNumber.push(i);
  }

  const tableData = useMemo(() => {
    let totalList = data;

    if (search) {
        totalList = totalList.filter((todo) =>
        todo.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalpages(totalList.length);

    //Current Page slice
    return totalList.slice(
      (currentPage - 1) * dataPerPage,
      (currentPage - 1) * dataPerPage + dataPerPage
    );
  }, [data, currentPage, search]);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const resetFilter = () => {
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h3 className="mt-3">Kaay Labs React Task</h3>
      <div className="mb-3 float-right">
        <label htmlFor="search" className="form-label">
          Search
        </label>
        <div className="input-group">
        <input
          type="text"
          className="form-control"
          id="search"
          placeholder="Search Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <div className="input-group-append mx-3">
        <button
          type="button"
          className="btn btn-danger btn-sm"
         onClick={resetFilter}
        >
          Reset Filters
        </button>

  </div>
        </div>
     
      </div>
      
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">Name</th>
            <th scope="col">Tagline</th>
            <th scope="col">First Brewed</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => {
            return (
              <tr key={item.id}>
                <td>{`#${item.id}`}</td>
                <td>
                  <img src={item.image_url} className="productImage" />
                </td>
                <td>{item.name}</td>
                <td>{item.tagline}</td>
                <td>{item.first_brewed}</td>
                <td>{item.description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
    dataList: state.RootReducer.dataList,
});

const mapDispatchToProps = {
  getTableData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
