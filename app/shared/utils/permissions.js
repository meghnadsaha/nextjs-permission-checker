// app/shared/utils/permissions.js
export const fetchModulePermissions = async (moduleName, userId, token) => {
    const response = await fetch(
      `http://localhost:8080/api/permissions/module/${moduleName}?userId=3`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    if (response.ok) {
      return await response.json();
    }
    return null;
  };
  