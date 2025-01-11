"use client";
import React, { useState } from 'react';

const CreateCandidateForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    phone: '',
    website: '',
    secondaryEmail: '',
    street: '',
    province: '',
    city: '',
    postalCode: '',
    country: '',
    experience: '',
    currentJobTitle: '',
    expectedSalary: '',
    skillSet: '',
    skypeID: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    candidateStatus: '',
    candidateOwner: '',
    emailOptOut: false,
    institute: '',
    major: '',
    degree: '',
    durationStartMonth: '',
    durationStartYear: '',
    durationEndMonth: '',
    durationEndYear: '',
    currentlyPursuing: false,
    occupationTitle: '',
    company: '',
    summary: '',
    workStartMonth: '',
    workStartYear: '',
    workEndMonth: '',
    workEndYear: '',
    currentlyWorking: false,
    resume: null,
    coverLetter: null,
    others: null,
    offer: null,
    contracts: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  return (
    <div className="container mt-5">
      <h2>Create Candidate</h2>
      <form>
        <table className="table table-bordered">
          <tbody>
            <tr className="border">
              <th colSpan="4" className="border">Basic Info</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">First Name</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} /></td>
              <td className="border-0 text-end">Last Name</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Email</td>
              <td className="border-0"><input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} /></td>
              <td className="border-0 text-end">Mobile</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Phone</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} /></td>
              <td className="border-0 text-end">Website</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Website" name="website" value={formData.website} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Secondary Email</td>
              <td className="border-0"><input type="email" className="form-control" placeholder="Secondary Email" name="secondaryEmail" value={formData.secondaryEmail} onChange={handleChange} /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Address Information</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Street</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Street" name="street" value={formData.street} onChange={handleChange} /></td>
              <td className="border-0 text-end">Province</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Province" name="province" value={formData.province} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">City</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="City" name="city" value={formData.city} onChange={handleChange} /></td>
              <td className="border-0 text-end">Postal Code</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Country</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Country" name="country" value={formData.country} onChange={handleChange} /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Professional Details</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Experience in Years</td>
              <td className="border-0"><input type="number" className="form-control" placeholder="Experience" name="experience" value={formData.experience} onChange={handleChange} /></td>
              <td className="border-0 text-end">Current Job Title</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Current Job Title" name="currentJobTitle" value={formData.currentJobTitle} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Expected Salary</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Expected Salary" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} /></td>
              <td className="border-0 text-end">Skill Set</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Skill Set" name="skillSet" value={formData.skillSet} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Skype ID</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Skype ID" name="skypeID" value={formData.skypeID} onChange={handleChange} /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Social Links</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">LinkedIn</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} /></td>
              <td className="border-0 text-end">Twitter</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Twitter" name="twitter" value={formData.twitter} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Facebook</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Other Info</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Candidate Status</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Candidate Status" name="candidateStatus" value={formData.candidateStatus} onChange={handleChange} /></td>
              <td className="border-0 text-end">Candidate Owner</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Candidate Owner" name="candidateOwner" value={formData.candidateOwner} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Email Opt Out</td>
              <td className="border-0">
                <input type="checkbox" className="form-check-input" name="emailOptOut" checked={formData.emailOptOut} onChange={handleChange} />
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Educational Details</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Institute / School</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Institute / School" name="institute" value={formData.institute} onChange={handleChange} /></td>
              <td className="border-0 text-end">Major / Department</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Major / Department" name="major" value={formData.major} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Degree</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Degree" name="degree" value={formData.degree} onChange={handleChange} /></td>
              <td className="border-0 text-end">Duration</td>
              <td className="border-0">
                <div className="d-flex">
                  <select className="form-select" name="durationStartMonth" value={formData.durationStartMonth} onChange={handleChange}>
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" name="durationStartYear" value={formData.durationStartYear} onChange={handleChange}>
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                  <span className="mx-2">To</span>
                  <select className="form-select" name="durationEndMonth" value={formData.durationEndMonth} onChange={handleChange}>
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" name="durationEndYear" value={formData.durationEndYear} onChange={handleChange}>
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">Currently Pursuing</td>
              <td className="border-0">
                <input className="form-check-input" type="checkbox" name="currentlyPursuing" checked={formData.currentlyPursuing} onChange={handleChange} />
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                <button className="btn btn-link text-primary" type="button">+ Add Educational Details</button>
              </th>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Experience Details</th>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Occupation / Title</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Occupation / Title" name="occupationTitle" value={formData.occupationTitle} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Company</td>
              <td className="border-0"><input type="text" className="form-control" placeholder="Company" name="company" value={formData.company} onChange={handleChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Summary</td>
              <td className="border-0"><textarea className="form-control" rows="3" placeholder="Summary" name="summary" value={formData.summary} onChange={handleChange}></textarea></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Work Duration</td>
              <td className="border-0">
                <div className="d-flex">
                  <select className="form-select" name="workStartMonth" value={formData.workStartMonth} onChange={handleChange}>
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" name="workStartYear" value={formData.workStartYear} onChange={handleChange}>
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                  <span className="mx-2">To</span>
                  <select className="form-select" name="workEndMonth" value={formData.workEndMonth} onChange={handleChange}>
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" name="workEndYear" value={formData.workEndYear} onChange={handleChange}>
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">I currently work here</td>
              <td className="border-0"><input className="form-check-input" type="checkbox" name="currentlyWorking" checked={formData.currentlyWorking} onChange={handleChange} /></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                <button className="btn btn-link text-primary" type="button">+ Add Experience Details</button>
              </th>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Attachment Information</th>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Resume</td>
              <td className="border-0"><input className="form-control" type="file" id="resume" name="resume" onChange={handleFileChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Cover Letter</td>
              <td className="border-0"><input className="form-control" type="file" id="cover-letter" name="coverLetter" onChange={handleFileChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Others</td>
              <td className="border-0"><input className="form-control" type="file" id="others" name="others" onChange={handleFileChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Offer</td>
              <td className="border-0"><input className="form-control" type="file" id="offer" name="offer" onChange={handleFileChange} /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Contracts</td>
              <td className="border-0"><input className="form-control" type="file" id="contracts" name="contracts" onChange={handleFileChange} /></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCandidateForm;
