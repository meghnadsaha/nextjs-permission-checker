"use client"; // Required for client-side rendering

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

export default function PermissionCard({ entity, permissions }) {
  return (
    <div className="card my-3">
      <div className="card-header">
        <h5 className="card-title">{entity}</h5>
      </div>
      <div className="card-body">
        <div className="row">
          {/* Tab Visible */}
          {permissions.tabVisible && (
            <div className="col-md-4 my-2">
              <button className="btn btn-primary w-100">Tab Visible: Yes</button>
            </div>
          )}
          {/* View */}
          {permissions.view && (
            <div className="col-md-4 my-2">
              <button className="btn btn-success w-100">View: Yes</button>
            </div>
          )}
          {/* Create */}
          {permissions.create && (
            <div className="col-md-4 my-2">
              <button className="btn btn-info w-100">Create: Yes</button>
            </div>
          )}
          {/* Edit */}
          {permissions.edit && (
            <div className="col-md-4 my-2">
              <button className="btn btn-warning w-100">Edit: Yes</button>
            </div>
          )}
          {/* Delete */}
          {permissions.delete && (
            <div className="col-md-4 my-2">
              <button className="btn btn-danger w-100">Delete: Yes</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
