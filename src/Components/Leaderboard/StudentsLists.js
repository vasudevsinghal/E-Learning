import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from '../Layout/Header';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import Students from '../../data/Students';
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
import BACKEND_URL from '../../url';
import UserPlaceholder from '../Home/UserPlaceholder';
import Badge from './Badge';

// const rowData = [
//   {
//     Rank: 1,
//     Name: 'Yugansh Sharu',
//     Coins: 100,
//     Badges: 'Gold',
//     'Courses Done': 5,
//   },
//   {
//     Rank: 1,
//     Name: 'Yugansh Sharu',
//     Coins: 100,
//     Badges: 'Gold',
//     'Courses Done': 5,
//   },
// ];

const StudentList = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const fetchedResult = await axios.get(`${BACKEND_URL}/api/leaderboard`);
        const fetchedUserDetails = fetchedResult.data.students;
        setUserDetails(fetchedUserDetails);
        // console.log(fetchedUserDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);
  const defaultColDef = useMemo(
    () => ({
      editable: false,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    }),
    []
  );
  const rowData = userDetails.map((d) => ({
    Rank: d.rank,
    Name: d.fullName,
    Coins: d.coins,
    Badges: <Badge badgeName={d.badge} />,
    'Courses Done': d.ongoingCourses.length,
  }));
  const columnDefs = [
    { field: 'Rank', filter: 'agNumberColumnFilter' },
    { field: 'Name', filter: 'agTextColumnFilter' },
    {
      field: 'Coins',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'Badges',
      filter: 'agTextColumnFilter',
      cellRenderer: ({ value }) => <div>{value}</div>,
    },
    { field: 'Courses Done', filter: 'agNumberColumnFilter' },
  ];
  const onClickHandler = async () => {
    console.log('You have clicked this button');
    const response = await axios.patch(
      `${BACKEND_URL}/api/student/change-coin/video-suggestion`
    );
    const responseData = response.data;
    // console.log(response);
    if (responseData.success) {
      console.log('Coin is updated');
    }
  };
  return (
    <Container fluid>
      <Header />
      {!isLoading && (
        <Fragment>
          <Container fluid>
            <div
              className="ag-theme-alpine"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '550px',
                marginLeft: '5rem',
                marginRight: '5rem',
              }}
            >
              <Row className="justify-content-center fs-3 fw-bold pt-3 pb-2">
                LeaderBoard
              </Row>
              {/* <button onClick={onClickHandler}>+</button> */}
              <div className="rounded-9" style={{ flex: '1 1 auto' }}>
                <AgGridReact
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  columnDefs={columnDefs}
                  suppressHorizontalScroll
                  pagination={true}
                  paginationPageSize={10}
                  domLayout={'autoHeight'}
                  //   suppressPaginationPanel={true}
                ></AgGridReact>
              </div>
            </div>
          </Container>
        </Fragment>
      )}
      {isLoading && <UserPlaceholder />}
    </Container>
  );
};
export default StudentList;
