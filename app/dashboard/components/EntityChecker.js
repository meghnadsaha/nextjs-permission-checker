"use client"; // Required for React hooks

import { useEffect, useState } from "react";
import { fetchModulePermissions } from "../../shared/utils/permissions";
import { useUser } from "../../shared/utils/userContext";
import PermissionCard from "./PermissionCard";

const entities = [
  "Home",
  "Job Openings",
  "Applications",
  "Candidates",
  "Referrals",
  "Interviews",
  "Departments",
  "Analytics",
  "Metrics",
  "Dashboards",
  "Reports",
  "Campaigns",
  "Assessments",
  "To-Dos",
  "Vendors",
  "Notes",
  "Recruiter Inbox",
  "My Actions",
  "Emails",
  "Documents",
  "Submissions",
  "Offers",
];

export default function EntityChecker() {
  const { user } = useUser();
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    if (user) {
      const fetchPermissions = async () => {
        const results = {};
        for (const entity of entities) {
          const permission = await fetchModulePermissions(
            entity,
            user.id,
            user.token
          );
          results[entity] = permission;
        }
        setPermissions(results);
      };

      fetchPermissions();
    }
  }, [user]);

  return (
    <div className="container my-4">
      <h1>Entity Permissions</h1>
      <div className="row">
        {entities.map((entity) => (
          <div className="col-md-6" key={entity}>
            {permissions[entity] && (
              <PermissionCard entity={entity} permissions={permissions[entity]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
