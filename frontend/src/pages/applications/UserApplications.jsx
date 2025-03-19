import { useEffect } from 'react';
import { Table, Spinner, Alert, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyApplications } from '../../features/applications/applicationsSlice';

const UserApplications = () => {
  const dispatch = useDispatch();
  const { myApplications, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);

  const statusVariant = (status) => {
    switch(status) {
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
      case 'Reviewed': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Applications</h3>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>Company</th>
            <th>Applied Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myApplications.map((app) => (
            <tr key={app._id}>
              <td>{app.job.title}</td>
              <td>{app.job.employer.companyName}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td>
                <Badge bg={statusVariant(app.status)}>
                  {app.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserApplications;