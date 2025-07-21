import { fetchCompanyBySlug } from "@/lib/services/companyServices";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CompanyContext = createContext();

export const useCompany = () => useContext(CompanyContext);

/**
 * CompanyProvider provides company data to the app via context.
 */
export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Convert to slug format
  const slugify = (str) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");


  // http://localhost:3000/companyName/owner/dashboard
  const pathParts = window.location.pathname.split("/");
  console.log("pathParts", pathParts);
  console.log("window.location.pathname", window.location);

  const companyName = pathParts[1];
  const role = pathParts[2];

  const companySlug = slugify(companyName);

  // Automatically fetch company from URL (e.g., domain.com/[companyName]/dashboard)
  useEffect(() => {
    if ((companyName)) {
      fetchCompany(companySlug);
    }
  }, []);

  const fetchCompany = async (companySlug) => {
    try {
      setLoading(true);
      const res = await fetchCompanyBySlug(companySlug, role);

      // if (res.redirectToLogin) {
      //   navigate(`/${companySlug}/${role}/login`);
      //   return;
      // }

      if (res.success) {
        if (companySlug === companyName) {
          setCompany(res.data);
          setError(null);
        } else {
          navigate(`${res.link}`, { replace: true });
        }
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Company fetch failed");
      // navigate('/not-found'); // optional
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider value={{ company, loading, error }}>
      {children}
    </CompanyContext.Provider>
  );
};
