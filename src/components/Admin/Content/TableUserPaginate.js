  import ReactPaginate from 'react-paginate';
  import { useState, useEffect } from 'react';

  const TableUserPaginate = (props) => {
    // const { listUser,pageCount} = props;
    const {listUser, pageCount} = props;

    const handlePageClick = (event) => {
      props.fetchListUsersWithPaginate(+event.selected + 1); 
      console.log(`User requested page number ${event.selected}`);
    };
    //componentsDidMount

    return (
      <>
        <table className="table table-hover table-info table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">USERNAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">ROLE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {listUser &&
              listUser.length > 0 &&
              listUser.map((item, index) => {
                return (
                  <tr key={`table-user-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      <button className="btn btn-secondary">View</button>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => props.handleClickBtnUpdate(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => props.handleClickBtnDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            {listUser && listUser.length === 0 && (
              <tr>
                <td colSpan={'5'}> Not found USER</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="user-pagination d-flex justify-content-center">
          <ReactPaginate
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< Prev"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={props.currentPage - 1}
          />
        </div>
      </>
    );
  };
  export default TableUserPaginate;
