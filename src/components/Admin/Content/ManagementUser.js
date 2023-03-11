  import ModalCreateUser from './ModalCreateUser';
  import './ManagementUser.scss';
  import { FcPlus } from 'react-icons/fc';
  import TableUser from './TableUser';
  import { useEffect, useState } from 'react';
  import { getAllUsers } from '../../../services/apiServices';
  import ModalUpdateUser from './ModalUpdateUser';


  const ManagementUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setSHowModalUpdateUser] = useState(false);

    const [listUser, setListUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});

    useEffect(() => {
      fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
      let res = await getAllUsers();
      console.log(res);
      if (res.EC === 0) {
        setListUser(res.DT);
      }
    };

    const handleClickBtnUpdate = (user) => {
      setSHowModalUpdateUser(true);
      setDataUpdate(user);
    };

    return (
      <div className="manager-users-container">
        <div className="title">Manager Users</div>
        <div className="users-content">
          <div className="btn-add-new">
            <button
              className="btn btn-dark"
              onClick={() => setShowModalCreateUser(true)}
            >
              {' '}
              <FcPlus /> Add new users
            </button>
          </div>

          <div className="table-users-container">
            <TableUser
              handleClickBtnUpdate={handleClickBtnUpdate}
              listUser={listUser}
            />
          </div>

          <ModalCreateUser
            show={showModalCreateUser}
            setShow={setShowModalCreateUser}
            fetchListUsers={fetchListUsers}
          />

          <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setSHowModalUpdateUser}
          dataUpdate={dataUpdate}
          />
        
        </div>
      </div>
    );
  };
  export default ManagementUser;
