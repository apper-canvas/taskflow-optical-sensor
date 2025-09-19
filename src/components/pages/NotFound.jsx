import React from 'react';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
      <div className="text-center">
        <div className="bg-gradient-to-br from-primary/10 to-success/10 p-8 rounded-full mb-6 inline-block">
          <ApperIcon name="FileQuestion" size={64} className="text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-secondary mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>
            <ApperIcon name="Home" size={16} className="mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;