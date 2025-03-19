import { useEffect } from 'react';
import { Table, Spinner, Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchEmployerApplications,
  updateApplicationStatus 
} from '../../features/applications/applicationsSlice';

const EmployerApplications = () => {
  const dispatch = useDispatch();
  const { employerApplications, loading, error } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchEmployerApplications());
  }, [dispatch]);

  const handleStatusChange = (applicationId, newStatus) => {
    dispatch(updateApplicationStatus({ id: applicationId, status: newStatus }));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Received Applications</h3>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Position</th>
            <th>Applied Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employerApplications.map((app) => (
            <tr key={app._id}>
              <td>{app.applicant.email}</td>
              <td>{app.job.title}</td>
              <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
              <td>
                <span className={`badge bg-${getStatusVariant(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td>
                <Form.Select 
                  value={app.status}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const getStatusVariant = (status) => {
  switch(status) {
    case 'Accepted': return 'success';
    case 'Rejected': return 'danger';
    case 'Reviewed': return 'warning';
    default: return 'secondary';
  }
};

export default EmployerApplications;