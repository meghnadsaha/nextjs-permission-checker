"use client"; // Required for React hooks


import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderCard = (title, items) => (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <ul className="list-unstyled mb-0">
            {items.map((item, index) => (
              <li key={index}>
                {/* Check if the item has a link */}
                {item.href ? (
                  <a href={item.href} className="text-decoration-none">
                    {item.text}
                    {item.badge && <span className="badge bg-warning text-dark">✨</span>}
                  </a>
                ) : (
                  item.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container my-5">
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <div className="position-relative">
            <input
              id="searchInput"
              className="form-control"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => document.getElementById('searchDropdown').classList.add('show')}
              onBlur={() => setTimeout(() => document.getElementById('searchDropdown').classList.remove('show'), 150)}
            />
            {/* Dropdown Suggestions */}
            <ul
              id="searchDropdown"
              className="dropdown-menu w-100"
              style={{ top: '100%', left: '0' }}
            >
              <li><a className="dropdown-item" href="#quickApply">Quick Apply</a></li>
              <li><a className="dropdown-item" href="#zoho">Zoho</a></li>
              <li><a className="dropdown-item" href="#zapierIntegration">Zapier Integration</a></li>
              <li><a className="dropdown-item" href="#dataBackup">Data Backup</a></li>
              <li><a className="dropdown-item" href="#smsGateway">SMS Gateway</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
        {renderCard('General', [
          { text: 'Personal Settings' },
          { text: 'Company Details' },
          { text: 'Calendar Settings ✨', badge: true },
          { text: 'Email Settings' },
          { text: 'Notification Settings' },
        ])}

        {renderCard('Select ', [
          { text: 'Searchable Drop Down', href: '/ui-components/SearchableDropdown' },
          { text: 'Tokenized Tag Input', href: '/ui-components/TokenizedTagInput' },          
          { text: 'Real-Time Client-Side Validation', href: '/ui-components/real-time-client-side-validation' },          

          { text: 'Real-Time Client-Side Validation v2', href: '/ui-components/real-time-client-side-validation-v2' },          

          // real-time-client-side-validation
        ])}

        {renderCard('Customization', [
          { text: 'Modules', href: '#modules' },
          { text: 'Templates', href: '#templates' },
          { text: 'Hiring Pipeline', href: '#hiringPipeline' },
          { text: 'Copy Customization', href: '#copyCustomization' },
          { text: 'Customize Home page', href: '#customizeHome' },
        ])}

        {renderCard('Resume Management', [
          { text: 'Resume Parser Mapping', href: '#resumeParserMapping' },
          { text: 'Resume Inbox', href: '#resumeInbox' },
        ])}

        {renderCard('Portal Setup', [
          { text: 'Portal', href: '#portal' },
        ])}

        {renderCard('Career Website', [
          { text: 'Career Site', href: '#careerSite' },
          { text: 'Webforms', href: '#webforms' },
        ])}

        {renderCard('Job Board Hub', [
          { text: 'Source Boosters', href: '#sourceBoosters' },
          { text: 'Job Boards', href: '#jobBoards' },
          { text: 'Quick Apply', href: '#quickApply' },
        ])}

        {renderCard('Automation', [
          { text: 'Workflow Rules', href: '#workflowRules' },
          { text: 'Actions', href: '#actions' },
        ])}

        {renderCard('Marketplace', [
          { text: 'Zoho', href: '#zoho' },
          { text: 'Google', href: '#google' },
          { text: 'Microsoft', href: '#microsoft' },
          { text: 'Zapier', href: '#zapier' },
        ])}

        {renderCard('Data Administration', [
          { text: 'Data Migration', href: '#dataMigration' },
          { text: 'Export', href: '#export' },
          { text: 'Remove Sample Data', href: '#removeSampleData' },
          { text: 'Data Backup', href: '#dataBackup' },
          { text: 'Storage', href: '#storage' },
          { text: 'Recycle Bin', href: '#recycleBin' },
          { text: 'Audit Log', href: '#auditLog' },
          { text: 'Activity Log', href: '#activityLog' },
        ])}

        {renderCard('Developer Space', [
          { text: 'APIs', href: '#apis' },
        ])}

        {renderCard('Telephony', [
          { text: 'Instant Messaging ✨', href: '#instantMessaging', badge: true },
          { text: 'Mobile Apps', href: '#mobileApps' },
        ])}

        {renderCard('Compliance', [
          { text: 'GDPR', href: '#gdpr' },
          { text: 'Sub Processors', href: '#subProcessors' },
          { text: 'EEO Compliance', href: '#eeoCompliance' },
          { text: 'OFCCP', href: '#ofccp' },
        ])}

        {renderCard('Zia', [
          { text: 'Chatbot', href: '#chatbot' },
          { text: 'AI Assist ✨', href: '#aiAssist', badge: true },
        ])}
      </div>
    </div>
  );
};

export default HomePage;
