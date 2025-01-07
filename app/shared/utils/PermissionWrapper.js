// app/shared/PermissionWrapper.js
export default function PermissionWrapper({ permission, children }) {
    return permission ? children : <div>Access Denied</div>;
  }
  