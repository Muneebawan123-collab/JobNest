import { useEffect } from 'react';
import { Badge, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../features/notifications/notificationsSlice';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const { items: notifications = [], loading } = useSelector((state) => state.notifications || {}); // ✅ Prevents undefined error

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const unreadCount = notifications.length > 0 
    ? notifications.filter(n => !n.read).length 
    : 0;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" id="notifications-dropdown">
        <i className="bi bi-bell"></i>
        {unreadCount > 0 && (
          <Badge bg="danger" className="ms-1">
            {unreadCount}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3" style={{ minWidth: '300px' }}>
        <h6 className="mb-3">Notifications</h6>
        {loading ? (
          <div className="text-muted text-center">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="text-muted text-center">No notifications</div>
        ) : (
          notifications.map(notification => (
            <Dropdown.Item 
              key={notification._id}
              className={`d-flex justify-content-between ${!notification.read ? 'fw-bold' : ''}`}
            >
              <div>
                <div>{notification.message}</div>
                <small className="text-muted">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </small>
              </div>
              {!notification.read && <span className="text-primary">•</span>}
            </Dropdown.Item>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBell;
